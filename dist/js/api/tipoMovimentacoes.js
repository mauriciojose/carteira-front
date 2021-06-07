
const table = document.querySelector('table#table-movimentacoes tbody');
const form = document.querySelector('form[name=movimentacoes]');

const selectTipo = form.querySelector('select#tipo');

var tipoMovimentacoes = [];

// var transacoes = [];

const getTipoMovimentacaoByForm = () => {
    let id = $("div#crud-modal form input#id").val();
    console.log(selectTipo);
    return {
        "id": id.trim() == '' ? null : id,
        "name": form.querySelector('input#name').value,
        "transacao": getTransacaoById(selectTipo.value)
    };
};

const setTipoMovimentacaoToForm = (tipoMovimentacao) => {
    form.querySelector('input#name').value = tipoMovimentacao.name;
    selectTipo.value = tipoMovimentacao.transacaoId;
};

const getTiposMovimentacoes = async () => {
    let tipoMovimentacoes = await axios.get('tipo_movimentacoes');
    return tipoMovimentacoes.data;
};

const getTipoMovimentacaoById = (id) => {
    return tipoMovimentacoes.find((tipoMovimentacao) => {
        return tipoMovimentacao.id == id;
    });
};

const updateCategoriaById = (newTipoMovimentacao) => {
    return tipoMovimentacoes.forEach((tipoMovimentacao, index, array) => {
        array[index] = tipoMovimentacao.id == newTipoMovimentacao.id ? newTipoMovimentacao : tipoMovimentacao;
    });
};

const showModal = (id='') => {
    $("div#crud-modal form input#id").val(id);
    let element = id != '' ? getTipoMovimentacaoById(id) : null;
    console.log(element);
    element != null ? setTipoMovimentacaoToForm(element) : ()=>{};
    $('div#crud-modal').modal('show');
};
const hideModal = () => {
    $('div#crud-modal').modal('hide');
};

const create = async (categoria) => {
    const response = await axios.post('tipo_movimentacoes', categoria);
    categoria = response.data;
    tipoMovimentacoes.push(categoria);
    console.log(tipoMovimentacoes);
    preencheTable();
    hideModal();
};

const update = async (categoria) => {
    const response = await axios.put(`tipo_movimentacoes/${categoria.id}`, categoria);
    // categoria = response.data;
    // tipoMovimentacoes.push(categoria);
    // console.log(tipoMovimentacoes);
    updateCategoriaById(categoria);
    preencheTable();
    hideModal();
};

const save = async () => {
    let tipoMovimentacao = getTipoMovimentacaoByForm();
    tipoMovimentacao.id == null ? create(tipoMovimentacao) : update(tipoMovimentacao);
};

const preencheTable = async () => {
    
    $('#table-movimentacoes').dataTable().fnDestroy();
    table.innerHTML = '';

    for (let index = 0; index < tipoMovimentacoes.length; index++) {
        const tipoMovimentacao = tipoMovimentacoes[index];
        table.innerHTML += tr(tipoMovimentacao);
    }

    $('#table-tipoMovimentacoes').dataTable({
        "bPaginate": true,
        "bLengthChange": false,
        "bFilter": false,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": false
    });
};

const tr = (element) => {
    return `
    <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.transacao.name}</td>
        <td>
            <a title='Editar' onclick='showModal(${element.id});' class="btn btn-primary" style='padding: 3px 6px;'><i class="fa fa-edit"></i> </a>
        </td>
    </tr>
    `;
};

const preencheSelect = (transacoes) => {
    transacoes.forEach((transacao, index, array) => {
        selectTipo.innerHTML += `
            <option value='${transacao.id}'>${transacao.name}</option>
        `;
    });
};

const iniciar = async () => {
    tipoMovimentacoes = await getTiposMovimentacoes();
    await getTransacoes();
    preencheSelect(transacoes);
    preencheTable();
}

iniciar();