document.addEventListener('DOMContentLoaded', function() {
    // Buscar usuários
    fetch('http://localhost:8000/chat/usuarios/')
        .then(response => response.json())
        .then(users => {
            const recipientSelect = document.getElementById('recipient');
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.username;
                recipientSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
        });

        document.getElementById('message-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            var message = document.getElementById('message').value;
            var recipientId = document.getElementById('recipient').value;
            var token = localStorage.getItem('token');
            
            if (!token) {
                console.error('Token de autenticação não encontrado.');
                return;
            }
            console.log(token)
            
            var data = {
                "conteudo": message,
                "destinatario_id": recipientId,
                "remetente": getAuthenticatedUserId(token) // Obter o ID do usuário autenticado a partir do token
            };
    
            // Simulando o envio da mensagem para a rota
            fetch('http://localhost:8000/chat/mensagens-enviar/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('response').innerText = 'Mensagem enviada com sucesso!';
                document.getElementById('message').value = ""; // Limpar o campo de mensagem
            })
            .catch(error => {
                document.getElementById('response').innerText = 'Ocorreu um erro ao enviar a mensagem.';
            });
        });
    
        // Função para obter o ID do usuário autenticado a partir do token
        function getAuthenticatedUserId(token) {
            // Lógica para decodificar o token e extrair o ID do usuário
            // Esta parte deve ser implementada de acordo com a sua lógica de autenticação
            // Exemplo:
            const decodedToken = parseJWT(token);
            return decodedToken.user_id;
        }
    
        // Função para decodificar o token JWT (JSON Web Token)
        function parseJWT(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
    
            return JSON.parse(jsonPayload);
        }
    });