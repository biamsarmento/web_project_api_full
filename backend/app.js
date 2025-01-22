const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors({
  origin: "*",
}));
app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

// app.use((req, res) => {
//   res.status(404).send({
//     message: 'Rota não encontrada. Verifique o endereço e tente novamente.',
//   });
// });

app.use((err, req, res, next) => {
  let statusCode = 500; // Padrão: Erro interno do servidor
  let message = 'Ocorreu um erro no servidor';

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400; // Dados inválidos
    message = 'Dados inválidos fornecidos';
  } else if (err.code === 11000) {
    statusCode = 409; // E-mail já existente
    message = 'E-mail já registrado no servidor';
  } else if (err.message === 'Forbidden') {
    statusCode = 403; // Ação não permitida
    message = 'Você não tem permissão para realizar essa ação';
  } else if (err.message === 'NotFound') {
    statusCode = 404; // Recurso não encontrado
    message = 'Recurso não encontrado';
  }

  res.status(statusCode).json({ message });
});

app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});
