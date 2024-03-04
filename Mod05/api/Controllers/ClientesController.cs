using System.Collections.Generic;
using System.Linq;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/clientes")]
    public class ClientesController : ControllerBase
    {

        CadCliDataContext _ctx = new CadCliDataContext();

        [HttpGet]
        public ActionResult<List<ClienteModel>> GetAll()
        {
            var clientes = _ctx.Clientes;

            return clientes.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<ClienteModel> GetById(int id)
        {
            var cliente = _ctx.Clientes.Find(id);
            if (cliente == null)
            {
                return NotFound();
            }
            return Ok(cliente);
        }

        [HttpPost]
        public ActionResult<ClienteModel> Add([FromBody] ClienteModel model)
        {
            if (model.Nome.Length < 5)
            {
                return BadRequest("O nome invalido!");
            }

            _ctx.Clientes.Add(model);
            _ctx.SaveChanges();
            return model;
        }

        [HttpPut("{id}")]
        public void Update(int id, [FromBody] ClienteModel model)
        {
            model.Id = id;
            _ctx.Clientes.Update(model);
            _ctx.SaveChanges();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var cliente = _ctx.Clientes.Find(id);


            if (cliente == null)
                return NotFound("Cliente não foi localizado");

            _ctx.Clientes.Remove(cliente);
            _ctx.SaveChanges();
            return Ok();
        }
    }
}