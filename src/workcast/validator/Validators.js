const validate = require('mongoose-validator')
const URL_REGEX = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

const urlValidator = validate({
  validator: (val) => {
    return URL_REGEX.test(val)
  },
  message: 'Avatar must be an URL'
});

const stringValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: false,
    message: 'Name should contain alpha-numeric characters only'
  }),
];

const titleValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 50],
    message: 'title should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: false,
    message: 'title should contain alpha-numeric characters only'
  }),
];

module.exports = {
  stringValidator,
  urlValidator,
  titleValidator
};