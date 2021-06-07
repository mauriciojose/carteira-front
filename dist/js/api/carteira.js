const form = document.querySelector('form[name=transacao]');
const saldos = document.querySelectorAll('.saldoText');

const selectTipo = form.querySelector('select#carteira_saida');
const containerTipo = form.querySelector('div#carteira_saida_container');

var carteira = {};

var clientes = [];

var user = 0;

var userId = getId();

var nomePessoas = document.querySelectorAll('.name-pessoa');
const getCarteira = async () => {
    let users = await axios.get('carteiras/user/'+userId);
    return users.data;
};

const getUsers = async () => {
    let carteira = await axios.get('/users/reduce/'+userId);
    return carteira.data;
};

const atualizaSaldo = (saldo) => {
    let saldoFormatado = formatValue(saldo);
    saldos.forEach((value, index, array) => {
        value.innerText = `R$ ${saldoFormatado}`;
    });
};

const getCarteiraByForm = () => {
    return {
        "valor": form.querySelector('input#valor').value,
        "tipo": form.querySelector('input#tipo').value,
        "carteira_entrada": carteira,
        "carteira_saida": user == 1 ? selectTipo.value: undefined
    };
};

const setClearToForm = () => {
    form.querySelector('input#valor').value = '';
};

const showModal = () => {
    $('div#modal-spin').modal('show');
};

const hideModal = () => {
    $('div#modal-spin').modal('hide');
};

const showModalTransacao = (fator,tipo, title, usuario) => {
    $('.modal-title').text(title);
    user = usuario;
    if (usuario == 1) {
        containerTipo.style.display = 'block';
    }else{
        containerTipo.style.display = 'none';
    }
    setClearToForm();
    $('input#tipo').val(tipo);
    $('div#crud-modal').modal('show');
};

const hideModalTransacao = () => {
    $('div#crud-modal').modal('hide');
};

const validate = (movimentacao) => {
    return movimentacao.valor.trim() == '' || getValueDecimal(movimentacao.valor) == 0.00 ? false : true;
};

const save = () => {
    let movimentacao = getCarteiraByForm();
    movimentacao.valor = getValueDecimal(movimentacao.valor);
    if (!validate(movimentacao)) {
        alert("adicione um valor válido");
        return false;
    }
    transacao(movimentacao);
};

const transacao = async (movimentacao) => {
    const response = await axios.post('movimentacoes', movimentacao);
    let saldo = response.data;
    atualizaSaldo(saldo);
    hideModalTransacao();
};

const preencheSelect = (clientes) => {
    clientes.forEach((cliente, index, array) => {
        selectTipo.innerHTML += `
            <option value='${cliente.carteira}'>${cliente.name}</option>
        `;
    });
};

const iniciar = async () => {
    showModal();
    carteira = await getCarteira();
    // carteira = carteira.length > 0 ? carteira[0] : null;
    nomePessoas.forEach((pessoa, index, array) => {
        pessoa.innerText = carteira.user.name;
    });
    atualizaSaldo(carteira.saldo);

    hideModal();
    clientes = await getUsers();
    preencheSelect(clientes);
    console.log(clientes);
};

iniciar();