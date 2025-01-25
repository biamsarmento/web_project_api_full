const validate = (schema, property = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  return next();
};

module.exports = validate;
