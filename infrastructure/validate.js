const validate = async (data, schema) => {
  try {
    return await schema.validate(data, { abortEarly: false });
  } catch (err) {
    throw new Error('Validation Error', err.errors);
  }
};

module.exports = validate;
