using System;
using System.Collections.Generic;
using System.Linq;

namespace WebSockerServer
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Iniciando o servidor ...");

            var ws = new Fleck.WebSocketServer("ws://127.0.0.1:8081");
            var clients = new List<Fleck.IWebSocketConnection>();

            ws.Start(socket => {
                socket.OnOpen = () => clients.Add(socket);
                socket.OnClose = () =>clients.Remove(socket);

                socket.OnMessage = (msg)=> {
                    clients.ToList().ForEach(c => {
                        if(c != socket) c.Send(msg);
                    });
                };
            });

            Console.WriteLine("Pressione enter para finalizar");
            Console.ReadLine();
        }
    }
}
