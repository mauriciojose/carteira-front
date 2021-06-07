
const addMascaraDecimal = () => {
    $("input.decimal").maskMoney({showSymbol:false, symbol:"R$", decimal:",", thousands:"."});
};

const formatValue = (value, casas=2) => {
    let formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: casas,
    });
    return formatter.format(value).replace('R$',"").trim();
};

const getValueDecimal = (valor) => {
    valor = valor+"";
    String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
      return this.split(needle).join(replacement);
    };
    valor = valor.replaceAll('.','');
    valor = valor.replaceAll(',','.');
    return valor;
  }