const tbody = document.querySelector('tbody');
const form = document.querySelector('form');
const txtNome = document.getElementById('txtNome');
const txtIdade = document.getElementById('txtIdade');

let _clienteId = 0;

let clientes = [{
        id: 1,
        nome: 'Fabiano',
        idade: 42
    },
    {
        id: 2,
        nome: 'Priscila',
        idade: 43
    },
    {
        id: 3,
        nome: 'Raphael',
        idade: 22
    },
];

console.table(clientes);

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
        cli.id = setId();
        cli.nome = txtNome.value;
        cli.idade = txtIdade.value;

        clientes.push(cli);
    } else {
        let cli = getCli(_clienteId);
        cli.nome = txtNome.value;
        cli.idade = txtIdade.value;
    }

    carregarTabela(clientes);
    _clienteId = 0;
    form.reset();
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

carregarTabela(clientes);