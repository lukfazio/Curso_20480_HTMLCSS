let clientesRepository = {
    getAll: () => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.onloadend = () => {
            if (xhr.status == 200) {
                clientes = JSON.parse(xhr.responseText);
            }

            carregarTabela(clientes);
        };
        xhr.send();
    },

    getById: (id) => { },

    add: (data) => {
        let xhr = new XMLHttpRequest();
        xhr.open('post', url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onloadend = () => {
            if (xhr.status == 200) {
                //clientes = JSON.parse(xhr.responseText);
                let cli = JSON.parse(xhr.responseText);
                msgBox.success(`Cliente ${data.nome} adicionado!`);
                clientes.push(cli);
                carregarTabela(clientes);
                _clienteId = 0;
                form.reset();
            } else {
                msgBox.error(`Erro ao adicionar o cliente ${data.nome}`);
            }
            carregarTabela(clientes);
        };
        xhr.send(JSON.stringify(data));
    },

    update: (data) => {
        let xhr = new XMLHttpRequest();
        xhr.open('put', url + data.id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onloadend = () => {
            if (xhr.status == 200) {
                msgBox.success(`Cliente ${data.nome} atualizado!`);
                carregarTabela(clientes);
                _clienteId = 0;
                form.reset();

            } else {
                msgBox.error(`Erro ao atualizar o cliente ${data.nome}`);
                _clienteId = 0;
                form.reset();
            }
        };
        xhr.send(JSON.stringify(data));
    },

    remove: (id) => {
        let xhr = new XMLHttpRequest();
        xhr.open('delete', url + id);
        xhr.onloadend = () => {
            if (xhr.status == 200) {
                console.log("Excluido com Sucesso!");
                msgBox.success(`Cliente id = ${id} excluido com sucesso!`);
            }

            else {
                msgBox.error(`Erro ao excluir o Cliente id = ${id}!`);
            }
        };
        xhr.send();
    }
};
