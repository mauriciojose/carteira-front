var formRegister = document.querySelector('form#register');

const getUser = () => {
    return {
        "name": formRegister.querySelector("input#name").value,
        "email": formRegister.querySelector("input#email").value,
        "senha": formRegister.querySelector("input#senha").value
    }
};

const save = async () => {
    let user = getUser();
    let validate = validator(user);
    if (!validate.valid) {
        alert(validate.msg);
    } else {
        const response = await axios.post('users', user);
        user = response.data;
        if (user != null) {
            login(user);
            window.location = '/';
        }else{
            alert("Usuário Já existe!");
        }
    }
};

const validator = (user) => {
    let validate = {
        valid: true,
        msg: ''
    };
    if (user.name.trim() == '') {
        validate.valid = false;
        validate.msg += "Digite um Nome \n";
    }
    if (user.senha.trim() == '') {
        validate.valid = false;
        validate.msg += "Digite uma Senha \n";
    }
    if (user.email.trim() == '') {
        validate.valid = false;
        validate.msg += "Digite um Email \n";
    }
    if (user.email.trim() != '' && !ValidateEmail(user.email)) {
        validate.valid = false;
        validate.msg += "Digite um Email Válido \n";
    }
    return validate;
};

const ValidateEmail = (mail) =>{
    let test = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(mail);
    console.log(test);
    return test;
}
