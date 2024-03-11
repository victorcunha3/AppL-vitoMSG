document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'signin.html';
    } else {

      // Adiciona mensagem de espera
      const loadingMessage = document.createElement('p');
      loadingMessage.textContent = 'Aguarde um momento...';
      document.body.appendChild(loadingMessage);

      fetch('http://localhost:8000/chat/publicacao/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch publications');
        }
      })
      .then(publications => {
        loadingMessage.remove();
        publications.reverse()
        displayPublications(publications);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  });
  
  function displayPublications(publications) {
    const publicationList = document.getElementById('publication-list');
  
    publications.forEach(publication => {
      const publicationDiv = document.createElement('div');
      publicationDiv.classList.add('publication');
  
      const authordata = document.createElement('p');
      authordata.classList.add('author');
      authordata.textContent = `@${publication.autor}`;
      publicationDiv.appendChild(authordata);
  
      const contentdata = document.createElement('p');
      contentdata.textContent = `- ${publication.conteudo}`;
      publicationDiv.appendChild(contentdata);
  
      const datedata = document.createElement('p');
      datedata.classList.add('date');
      datedata.textContent = `Data_Postagem: ${new Date(publication.data_publicacao).toLocaleString()}`;
      publicationDiv.appendChild(datedata);

      const visibilitydata = document.createElement('p');
      visibilitydata.textContent = `Visibilidade: ${publication.visibilidade}`
      publicationDiv.appendChild(visibilitydata) 
  
      publicationList.appendChild(publicationDiv);
    });
  }
  
  document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'signin.html';
  });

  document.getElementById('create-post-button').addEventListener('click', function() {
    window.location.href = 'tela_criar_publicacao.html';
  });

  document.getElementById('button-my-publi').addEventListener('click', function(){
    window.location.href = 'tela_ver_publicacao_usuario.html'
  })

  function goBack() {
    window.history.back();
  }