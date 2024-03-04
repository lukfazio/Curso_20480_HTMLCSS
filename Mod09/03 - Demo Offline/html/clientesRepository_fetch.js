let clientesRepository = {
    getAll: () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                clientes = data;
                carregarTabela(clientes);
            })
    },

    getById: (id) => {},

    add: (data) => {

        let request = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch(url, request)
            .then(response => {
                console.log(response.status);
                console.log(response);

                if (!response.ok) {
                    //TODO: Resolver msg de erro
                    throw Error(response.statusText);                    
                }
                else
                {
                    return response.json();
                }                
            })
            .then(json => {
                let cli = json;
                msgBox.success(`Cliente ${data.nome} adicionado!`);
                clientes.push(cli);
                carregarTabela(clientes);
                _clienteId = 0;
                form.reset();
            })
            .catch(error => {
                msgBox.error(error);
                console.log(error);
            })        
    },

    update: (data) => {
        let request = {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch(url + data.id, request)
            .then(response => {
                console.log(response.status);
                console.log(response);

                if (!response.ok) {
                    //TODO: Resolver msg de erro
                    throw Error(response.statusText);                    
                }
                else
                {
                    msgBox.success(`Cliente ${data.nome} atualizado!`);
                    carregarTabela(clientes);
                    _clienteId = 0;
                    form.reset();
                }                
            })
            .catch(error => {
                msgBox.error(error);
                console.log(error);
                _clienteId = 0;
                form.reset();
            })      
    },

    remove: (id) => {
        let request = {
            method: 'delete'
        };

        fetch(url + id, request)
            .then(response => {
                console.log(response.status);
                console.log(response);

                if (!response.ok) {
                    //TODO: Resolver msg de erro
                    throw Error(response.statusText);                    
                }
                else
                {
                    console.log("Excluido com Sucesso!");
                    msgBox.success(`Cliente id = ${id} excluido com sucesso!`);
                }                
            })
            .catch(error => {
                msgBox.error(error);
                console.log(error);
                _clienteId = 0;
                form.reset();
            })           
    }
};