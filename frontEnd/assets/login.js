document.getElementById('formulario-entrada').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const URLapi = 'https://applovito.onrender.com/chat/token/';
    fetch(URLapi, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            username:username,
            password:password
        })
    })
    .then(response => {
        if (response.ok) {
          // Handle successful login
          return response.json();
        } else {
          console.error('Login failed');
          throw new Error('Login failed');
        }
      })
      .then(data => {
        console.log('Data:', data);
        const token = data.access;
        console.log('Token:', token);
        localStorage.setItem('token', token);
        console.log(token)

        window.location.href = 'tela_publicacao_publica.html';
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });