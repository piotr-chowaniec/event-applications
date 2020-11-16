const Yup = require('yup');

const loginUserSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().label('Password').required(),
});

const registerUserSchema = Yup.object().shape({
  firstName: Yup.string().label('First Name').required().min(5, 'First Name must be at least 5 characters long'),
  lastName: Yup.string().label('Last Name').required().min(5, 'Last Name must be at least 5 characters long'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().label('Password').required(),
  confirmPassword: Yup.string().label('Confirm Password').required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const updateProfileSchema = Yup.object().shape({
  firstName: Yup.string().label('First Name').required().min(5, 'First Name must be at least 5 characters long'),
  lastName: Yup.string().label('Last Name').required().min(5, 'Last Name must be at least 5 characters long'),
  email: Yup.string().email().required().label('Email'),
});

module.exports = {
  loginUserSchema,
  registerUserSchema,
  updateProfileSchema,
};
