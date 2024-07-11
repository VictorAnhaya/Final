using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Adicionar o contexto do banco de dados
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite("Victor.db"));

        // Configurar a política de CORS
        builder.Services.AddCors(options =>
            options.AddPolicy("Acesso Total",
                policy => policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod())
        );

        var app = builder.Build();

        app.UseCors("Acesso Total");

        // Endpoint inicial
        app.MapGet("/", () => "Prova Final");

        // ENDPOINTS DE ALUNO

        // GET: /aluno/listar
        app.MapGet("/aluno/listar", async ([FromServices] AppDbContext db) =>
        {
            if (await db.Alunos.AnyAsync())
            {
                return Results.Ok(await db.Alunos.ToListAsync());
            }
            return Results.NotFound("Nenhum aluno encontrado");
        });

        // POST: /aluno/cadastrar
        app.MapPost("/aluno/cadastrar", async ([FromServices] AppDbContext db, [FromBody] Aluno aluno) =>
        {
            if (await db.Alunos.AnyAsync(a => a.CPF == aluno.CPF))
            {
                return Results.BadRequest("Aluno com este CPF já cadastrado.");
            }
            db.Alunos.Add(aluno);
            await db.SaveChangesAsync();
            return Results.Created($"/aluno/{aluno.Id}", aluno);
        });

        // ENDPOINTS DE IMC

        // GET: /imc/listar
        app.MapGet("/imc/listar", async ([FromServices] AppDbContext db) =>
        {
            if (await db.IMCs.AnyAsync())
            {
                return Results.Ok(await db.IMCs.Include(i => i.Aluno).ToListAsync());
            }
            return Results.NotFound("Nenhum IMC encontrado");
        });

        // POST: /imc/cadastrar
        app.MapPost("/imc/cadastrar", static async ([FromServices] AppDbContext db, [FromBody] IMC imc) =>
        {
            var aluno = await db.Alunos.FindAsync(imc.AlunoId);
            if (aluno == null)
            {
                return Results.NotFound("Aluno não encontrado");
            }
            imc.ValorIMC = imc.Peso / (imc.Altura * imc.Altura);
            imc.Classificacao = ClassificarIMC(imc.ValorIMC);
            imc.Aluno = aluno;
            db.IMCs.Add(imc);
            await db.SaveChangesAsync();
            return Results.Created($"/imc/{imc.Id}", imc);
        });

        // Função para classificar o IMC
        string ClassificarIMC(double imc)
        {
            if (imc < 18.5) return "Abaixo do peso";
            if (imc >= 18.5 && imc <= 24.9) return "Peso normal";
            if (imc >= 25 && imc <= 29.9) return "Sobrepeso";
            if (imc >= 30 && imc <= 34.9) return "Obesidade grau 1";
            if (imc >= 35 && imc <= 39.9) return "Obesidade grau 2";
            return "Obesidade grau 3";
        }

        app.Run();
    }
}

public class Aluno
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string CPF { get; set; }
}

public class IMC
{
    public int Id { get; set; }
    public int AlunoId { get; set; }
    public Aluno Aluno { get; set; }
    public double Altura { get; set; }
    public double Peso { get; set; }
    public double ValorIMC { get; set; }
    public string Classificacao { get; set; }
    public DateTime DataCriacao { get; set; } = DateTime.Now;
}

public class AppDbContext : DbContext
{
    public DbSet<Aluno> Alunos { get; set; }
    public DbSet<IMC> IMCs { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=imc.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Aluno>()
            .HasIndex(a => a.CPF)
            .IsUnique();

        modelBuilder.Entity<IMC>()
            .HasOne(i => i.Aluno)
            .WithMany()
            .HasForeignKey(i => i.AlunoId);
    }
}
