const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const socketio = require('socket.io')

// app.listen() returns an http.Server object
const server = app.listen(1337, function () {
    console.log(`Listening on http://localhost:${server.address().port}`);
});

const io = socketio(server);

// const inMemoryDrawHistory = [];

io.on('connection', socket => {
  console.log(`Welcome new socket: ${socket.id}`);

  socket.on('app-on', () => {
    socket.broadcast.emit('app-join-client');
    console.log('app on');
  });

  socket.on('leave', () => {
    socket.disconnect();
    socket.broadcast.emit('app-leave-client');
    console.log('app leave');
  });

  socket.on('data', accl => {
    socket.broadcast.emit('accl-to-client', accl);
  });

  socket.on('touch', action => {
    console.log(action);
  })
  // if(inMemoryDrawHistory.length) {
  //   console.log("gonna load", inMemoryDrawHistory)
  //   socket.emit('load', inMemoryDrawHistory)
  // }

  // socket.on('draw', (start, end, color) => {
  //   inMemoryDrawHistory.push({start, end, color});
  //   socket.broadcast.emit('draw', start, end, color)
  // })

  socket.on('disconnect', () => {
    console.log(`Goodbye old friend: ${socket.id}`);
  })
});

io.on('disconnect', socket => {
  console.log(`Game is Over`);
})

app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// compression middleware
app.use(compression());

app.use('/mobile', require('./mobile.js'));

app.use(express.static(path.join(__dirname, '..', 'public')));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

