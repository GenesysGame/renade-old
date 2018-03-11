// JS scripts for login window

let loginButton = document.getElementById('login'),
    registerButton = document.getElementById('register'),
    loader = document.getElementsByClassName('loader')[0],
    usernameInput = document.getElementById('username'),
    passwordInput = document.getElementById('password');

function login() {
    startLoading();

    let username = usernameInput.value;
    let password = passwordInput.value;

    mp.trigger('loginWindow:login', username, password);
}

function register() {
    mp.trigger('loginWindow:register');
}

function fillUsername(name) {
    usernameInput.value = name;
}

// loading

function startLoading() {
    loginButton.disabled = true;
    registerButton.disabled = true;
    usernameInput.disabled = true;
    passwordInput.disabled = true;
    loader.style.visibility = 'visible';
}

function stopLoading() {
    loginButton.disabled = false;
    registerButton.disabled = false;
    usernameInput.disabled = false;
    passwordInput.disabled = false;
    loader.style.visibility = 'hidden';
}
