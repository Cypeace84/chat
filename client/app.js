const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

messageContentInput.setAttribute('autocomplete', 'off');

const login = (event) => {
  event.preventDefault();
  const enteredUserName = userNameInput.value;

  if (enteredUserName === '') {
    alert('Please enter your username');
    return;
  }
  userName = enteredUserName;

  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
};

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}
const sendMessage = (event) => {
  event.preventDefault();
  const enteredMessage = messageContentInput.value;

  if (enteredMessage === '') {
    alert('Please enter your message');
    return;
  }
  addMessage(userName, enteredMessage);
  messageContentInput.value = '';
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
