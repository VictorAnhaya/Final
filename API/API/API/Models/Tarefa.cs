using Microsoft.EntityFrameworkCore;

public class Aluno
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public string? CPF { get; set; }
}

public class IMC
{
    public int Id { get; set; }
    public int? AlunoId { get; set; }
    public Aluno? Aluno { get; set; }
    public double? Altura { get; set; }
    public double?Peso { get; set; }
    public double? ValorIMC { get; set; }
    public string? Classificacao { get; set; }
    public DateTime? DataCriacao { get; set; } = DateTime.Now;
}
