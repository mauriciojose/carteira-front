var TOKEN_KEY = "@carteira-Token";
var isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
var getToken = () => localStorage.getItem(TOKEN_KEY);
var getId = () => localStorage.getItem('user_id');
var login = user => {
    localStorage.setItem(TOKEN_KEY, user.token);
    localStorage.setItem('user_id', user.id);
};
var logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('user_id');
    window.location = '/login.html';
};

const isLogin = ()=>{
    if (!isAuthenticated()) {
        window.location = '/login.html';
    }
};