const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.pseudo = !isEmpty(data.pseudo) ? data.pseudo : '';
    data.password = !isEmpty(data.password) ? data.password : '';

   
    if(Validator.isEmpty(data.pseudo)) {
        errors.pseudo = 'pseudo is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}