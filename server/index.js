const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const socketio = require('socket.io');
const PORT = process.env.PORT || 1337;

// app.listen() returns an http.Server object
const server = app.listen(PORT, function () {
    // console.log(`Listening on http://localhost:${server.address().port}`);
});

const io = socketio(server);

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

