const express = require('express');
const app = express();
const port = 8001;
const socket = require('socket.io');

const messages = [];
const users = [];
console.log('messages:', messages);

app.use(express.static('client'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('message', (message) => {
    console.log(
      "Oh, I've got something from " + socket.id + ': ' + message.content
    );
    messages.push(message);
    console.log('messages:', messages);
    socket.broadcast.emit('message', {
      author: message.author,
      content: message.content,
      isSystemMessage: false, // Ustawiamy wartość na false dla zwykłej wiadomości
    });
  });

  socket.on('join', (name) => {
    const user = { name, id: socket.id };
    console.log('user:', user);
    users.push(user);
    // socket.broadcast.emit('join', name);
    socket.broadcast.emit('message', {
      author: 'Chat Bot',
      content: `${name} has joined the conversation!`,
      isSystemMessage: true,
    });
  });
  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      const user = users[index];
      users.splice(index, 1);

      socket.broadcast.emit('message', {
        author: 'Chat Bot',
        content: `${user.name} has left the conversation... :(`,
        isSystemMessage: true,
      });
    }
  });
  console.log("I've added a listener on message event \n");
});
