
const table = document.querySelector('table#table-categorias tbody');
const form = document.querySelector('form[name=categoria]');

var categorias = [];

const getCategoriaByForm = () => {
    let id = $("div#crud-modal form input#id").val();
    return {
        "id": id.trim() == '' ? null : id,
        "name": form.querySelector('input#name').value
    };
};

const setCategoriaToForm = (categoria) => {
    form.querySelector('input#name').value = categoria.name;
};

const getCategorias = async () => {
    let categorias = await axios.get('categorias');
    return categorias.data;
};

const getCategoriaById = (id) => {
    return categorias.find((categoria) => {
        return categoria.id == id;
    });
};

const updateCategoriaById = (newCategoria) => {
    return categorias.forEach((categoria, index, array) => {
        array[index] = categoria.id == newCategoria.id ? newCategoria : categoria;
    });
};

const showModal = (id='') => {
    $("div#crud-modal form input#id").val(id);
    let element = id != '' ? getCategoriaById(id) : null;
    console.log(element);
    element != null ? setCategoriaToForm(element) : ()=>{};
    $('div#crud-modal').modal('show');
};
const hideModal = () => {
    $('div#crud-modal').modal('hide');
};

const create = async (categoria) => {
    const response = await axios.post('categorias', categoria);
    categoria = response.data;
    categorias.push(categoria);
    console.log(categorias);
    preencheTable();
    hideModal();
};

const update = async (categoria) => {
    const response = await axios.put(`categorias/${categoria.id}`, categoria);
    // categoria = response.data;
    // categorias.push(categoria);
    // console.log(categorias);
    updateCategoriaById(categoria);
    preencheTable();
    hideModal();
};

const save = async () => {
    let categoria = getCategoriaByForm();
    categoria.id == null ? create(categoria) : update(categoria);
};

const preencheTable = async () => {
    
    $('#table-categorias').dataTable().fnDestroy();
    table.innerHTML = '';

    for (let index = 0; index < categorias.length; index++) {
        const categoria = categorias[index];
        table.innerHTML += tr(categoria);
    }

    $('#table-categorias').dataTable({
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
        <td>
            <a title='Editar' onclick='showModal(${element.id});' class="btn btn-primary" style='padding: 3px 6px;'><i class="fa fa-edit"></i> </a>
        </td>
    </tr>
    `;
};

const iniciar = async () => {
    categorias = await getCategorias();
    preencheTable();
}

iniciar();