
const table = document.querySelector('table#table-extratos tbody');

var extratos = [];

var userId = getId();

const getCategorias = async () => {
    let extratos = await axios.get('movimentacoes/'+userId);
    return extratos.data;
};

const preencheTable = async () => {
    
    $('#table-extratos').dataTable().fnDestroy();
    table.innerHTML = '';

    for (let index = 0; index < extratos.length; index++) {
        const categoria = extratos[index];
        table.innerHTML += tr(categoria);
    }

    $('#table-extratos').dataTable({
        "bPaginate": true,
        "bLengthChange": false,
        "bFilter": false,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": false
    });
};

const getStatus = (status) =>{
    let statusMap = {
        '1': "CONCLUIDA",
        '0': "PENDENTE",
        '-1': "ESTORNADA"
    };
    return statusMap[status];
};

const formataData = (data) => {
    let date = new Date(data);
    let dia = date.getDate();
    dia = dia < 10 ? '0'+dia: dia;
    
    let mes = date.getMonth()+1;
    mes = mes < 10 ? '0'+mes: mes;

    return `${dia}/${mes}/${date.getFullYear()}`;
};

const tr = (element) => {
    return `
    <tr>
        <td>${element.tipo}</td>
        <td>${element.name == null ? '' : element.name}</td>
        <td>${formataData(element.data)}</td>
        <td>${getStatus(element.status)}</td>
    </tr>
    `;
};

const iniciar = async () => {
    extratos = await getCategorias();
    preencheTable();
}

iniciar();