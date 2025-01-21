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
// app.use(errors());

app.use((req, res) => {
  res.status(404).send({
    message: 'Rota não encontrada. Verifique o endereço e tente novamente.',
  });
});

app.use((err, req, res) => {
  console.error('Erro interno:', err.stack); // Log do erro no console
  res.status(500).send({
    message: 'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.',
  });
});

app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});
