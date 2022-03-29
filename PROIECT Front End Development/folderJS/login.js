function checkUserPass() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


console.log('====', username, password);

if (username === 'Andreea' && password === '1234') {
    document.getElementById('try_succes').style.display = ' block';
    document.getElementById('try_error').style.display = 'none';
     sessionStorage.setItem('userLogged', 'logged');
     window.location.replace('index.html');
} else {
    document.getElementById('try_succes').style.display = ' none';
    document.getElementById('try_error').style.display = 'block';
   
}


}

function checkLoggedUser() {
    const userLoggedIn = sessionStorage.getItem('userLogged');
    if (userLoggedIn === 'logged') {
        window.location.replace('index.html');
    }
}