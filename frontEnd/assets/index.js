document.getElementById('formulario-registro').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch('http://localhost:8000/chat/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        document.getElementById('message').textContent = 'Registro bem-sucedido!';
        window.location.href = 'signin.html';
      } else {
        document.getElementById('message').textContent = data.detail || 'Erro no registro.';
      }
    } catch (error) {
      console.error('Erro:', error);
      document.getElementById('message').textContent = 'Erro de conexão.';
    }
  });
  