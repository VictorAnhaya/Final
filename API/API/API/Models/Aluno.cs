namespace API.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string CPF { get; set; }
    }
}