var transacoes = [];

const getTransacoes = async () => {
    transacoes = await axios.get('transacoes');
    transacoes = transacoes.data;
    return transacoes;
};

const getTransacaoById = (id) => {
    return transacoes.find((transacao) => {
        return transacao.id == id;
    });
};