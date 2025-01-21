const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Autorização necessária.' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // console.log("Payload:", payload);
    req.user = payload;
    // console.log("Req:", req.user);
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Token inválido ou expirado.' });
  }
};
