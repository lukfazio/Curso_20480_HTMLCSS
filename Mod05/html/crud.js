const tbody = document.querySelector('tbody');
const form = document.querySelector('form');
const txtNome = document.getElementById('txtNome');
const txtIdade = document.getElementById('txtIdade');
const url = 'http://localhost:5000/api/clientes/'
const divStatus = document.querySelector("#divStatus")


let _clienteId = 0;

let clientes = [];

let msgBox = {
    success: (msg) => {
        divStatus.innerHTML =
            `
            <p class="success">${msg}</p>
        `;
        msgBox.clear();
    },
    warning: (msg) => {
        divStatus.innerHTML =
            `
            <p class="warning">WARING: ${msg}</p>
        `;
        msgBox.clear();
    },
    error: (msg) => {
        divStatus.innerHTML =
            `
            <p class="error">ERRO: ${msg}</p>
        `;
        msgBox.clear();
    },
    clear: () => {
        setTimeout(() => {
            divStatus.textContent = '';    
        }, 3000);        
    }

}


function carregarTabela(data) {
    tbody.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        carregarLinha(data[i]);
    }
}

function carregarLinha(item) {
    tbody.innerHTML +=
        `
        <tr id="cliente-${item?.id}">
            <td>${item?.id}</td>
            <td>${item?.nome}</td>
            <td>${item?.idade}</td>
            <td>
                <button onclick="excluirCliente(${item?.id})">x</button> | 
                <button onclick="loadCliente(${item?.id})">alt</button>
            </td>
        </tr>
    `
}

function excluirCliente(id) {
    const resp = confirm(`Deseja excluir o cliente de Id ${id}`);

    if (resp) {
        //console.log(`Excluindo Cliente de Id ${id}...`);
        document.getElementById(`cliente-${id}`)?.remove();
        clientes.splice(getIndex(id), 1);
        clientesRepository.remove(id);
    }
}

function loadCliente(id) {
    _clienteId = id;
    let cli = getCli(id);

    txtNome.value = cli.nome;
    txtIdade.value = cli.idade;

}

form.onsubmit = (e) => {
    console.log(e);
    e.preventDefault();

    if (_clienteId === 0) {
        let cli = {};
        cli.id = 0;
        cli.nome = txtNome.value;
        cli.idade = Number(txtIdade.value);
        msgBox.warning(`Adicionando o Cliente...`);
        clientesRepository.add(cli);

    } else {
        let cli = getCli(_clienteId);
        cli.nome = txtNome.value;
        cli.idade = parseInt(txtIdade.value);
        msgBox.warning(`Atualizando o Cliente...`);
        clientesRepository.update(cli);
    }    
}

form.onreset = () => {
    _clienteId = 0;
}

function setId() {
    let ids = clientes.map(x => x.id);
    return Math.max(...ids) + 1;
}

function getCli(id) {
    return clientes.find(c => c.id == id);
}

function getIndex(id) {
    return clientes.indexOf(getCli(id));
}

clientesRepository.getAll();