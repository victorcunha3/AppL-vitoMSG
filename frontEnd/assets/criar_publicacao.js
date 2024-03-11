document.getElementById('create-post-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const content = document.getElementById('content').value;
    const visibility = document.getElementById('visibility').value;
  
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect user to login page if token is not available
      window.location.href = 'signin.html';
      return;
    }
  
    const apiUrl = 'https://applovito.onrender.com/chat/publicacao/';
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        conteudo: content,
        visibilidade: visibility
      })
    })
    .then(response => {
      if (response.ok) {
        
        console.log('Post created successfully');
        window.location.href = 'tela_publicacao_publica.html';
      } else {
        console.error('Failed to create post');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  function goBack() {
    window.history.back();
  }
  