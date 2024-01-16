// Login - index.html
function login() {
  // Obtém os valores do formulário
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Referência ao elemento de mensagem de erro
  var errorMessageElement = document.getElementById('errorMessage');

  // Limpa a mensagem de erro
  errorMessageElement.textContent = '';

  // Verifica se os campos estão preenchidos
  if (username.trim() === '' || password.trim() === '') {
    // Exibe a mensagem de erro
    errorMessageElement.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  // Autentica o usuário no Firebase
  firebase.auth().signInWithEmailAndPassword(username, password)
    .then(function (userCredential) {
      // Verifica se o usuário está autenticado
      if (firebase.auth().currentUser) {
        // Autenticação bem-sucedida, redirecione para a próxima página
        window.location.href = "./page/Home.html";
      } else {
        // Se não estiver autenticado, exibe uma mensagem de erro
        errorMessageElement.textContent = "Usuário não autenticado";
      }
    })
    .catch(function (error) {
      // Trata os erros de autenticação aqui
      if (error.code === 'auth/wrong-password') {
        errorMessageElement.textContent = "Senha incorreta. Por favor, tente novamente.";
      } else if (error.code === 'auth/user-not-found') {
        errorMessageElement.textContent = "Usuário não encontrado. Por favor, verifique seu usuário.";
      } else {
        errorMessageElement.textContent = "Erro de autenticação: " + error.message;
      }
    });
}

// Ouvinte de evento para o envio do formulário
document.getElementById('loginForm').addEventListener('submit', function(event) {
  // Evita o envio padrão do formulário
  event.preventDefault();

  // Chama a função de login
  login();
});

// Ouvinte de evento para o clique no botão "Entrar"
document.getElementById('loginButton').addEventListener('click', function(event) {
  // Evita o comportamento padrão do clique no botão
  event.preventDefault();

  // Chama a função de login
  login();
});

// Ouvinte de evento para a tecla "Enter" no formulário
document.getElementById('loginForm').addEventListener('keypress', function(event) {
  // Verifica se a tecla pressionada é "Enter" (código 13)
  if (event.key === 'Enter') {
    // Evita o comportamento padrão da tecla "Enter" no formulário
    event.preventDefault();

    // Chama a função de login
    login();
  }
});
