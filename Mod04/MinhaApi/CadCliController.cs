using Microsoft.AspNetCore.Mvc;

namespace MinhaApi
{
    public class CadCliController
    {
        [HttpPost("cadcli")]
        public string AddCli(string nome, string cpf, string cupom)
        {
            return $"Nome: {nome} - CPF: {cpf} - Cupom: {cupom}";
        }
    }
}