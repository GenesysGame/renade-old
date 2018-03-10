// JS scripts for login window

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    mp.trigger('loginWindow:login', username, password);
}

function register() {
    mp.trigger('loginWindow:register');
}