using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Cliente")]
    public class ClienteModel
    {   
        public int Id { get; set; }

        public string Nome { get; set; }

        public int Idade { get; set; }
        
    }
}