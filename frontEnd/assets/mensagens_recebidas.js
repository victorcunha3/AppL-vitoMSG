document.addEventListener('DOMContentLoaded', function() {
    var token = localStorage.getItem('token');

    if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
    }

    fetch('http://localhost:8000/chat/mensagens-recebidas/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(messages => {
        const messagesList = document.getElementById('messages-list');
        messages.forEach(message => {
            const li = document.createElement('li');
            li.innerHTML = `<div>${message.conteudo}</div>
                            <div class="message-info">
                                <span>Remetente: ${message.remetente}</span> |
                                <span>Data de Envio: ${message.data_envio}</span> |
                                <span class="${message.lida ? '' : 'unread'}">${message.lida ? 'Lida' : 'Não lida'}</span>
                            </div>`;
            messagesList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar mensagens:', error);
    });
});
