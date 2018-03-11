// JS scripts for register window

let loginButton = document.getElementById('login'),
    registerButton = document.getElementById('register'),
    loader = document.getElementsByClassName('loader')[0],
    usernameInput = document.getElementById('username'),
    passwordInput = document.getElementById('password'),
    repeatPasswordInput = document.getElementById('repeat-password'),
    emailInput = document.getElementById('email');

function login() {
    mp.trigger('registerWindow:login');
}

function register() {
    let username = usernameInput.value;
    let password = passwordInput.value;
    let repeat = repeatPasswordInput.value;
    let email = emailInput.value;

    mp.trigger('registerWindow:register', username, password, repeat, email);
}

function fillUsername(name) {
    usernameInput.value = name;
}

// Loading

function startLoading() {
    loginButton.disabled = true;
    registerButton.disabled = true;
    usernameInput.disabled = true;
    passwordInput.disabled = true;
    repeatPasswordInput.disabled = true;
    emailInput.disabled = true;
    loader.style.visibility = 'visible';
}

function stopLoading() {
    loginButton.disabled = false;
    registerButton.disabled = false;
    usernameInput.disabled = false;
    passwordInput.disabled = false;
    repeatPasswordInput.disabled = false;
    emailInput.disabled = false;
    loader.style.visibility = 'hidden';
}
