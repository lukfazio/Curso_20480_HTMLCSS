using Microsoft.AspNetCore.Mvc;

namespace ContatoApi.Controller
{
    public class ContatoController
    {
        [HttpPost("contato")]
        public string Save(string nome, string sobrenome, string email)
        {
            var retorno = string.Empty;

            retorno = $"{nome} {sobrenome} - Email: {email}";

            return retorno;
        }
    }
}