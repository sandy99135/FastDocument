const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.nom = !isEmpty(data.nom) ? data.nom : '';
    data.pseudo = !isEmpty(data.pseudo) ? data.pseudo: '';
    data.prenom = !isEmpty(data.prenom) ? data.prenom : '';
    data.birthday = !isEmpty(data.birthday) ? data.birthday : '';
    data.ancquartier = !isEmpty(data.ancquartier) ? data.ancquartier : '';
    data.nouvquartier = !isEmpty(data.nouvquartier) ? data.nouvquartier : '';
    data.adresse = !isEmpty(data.adresse) ? data.adresse : '';
    data.telephone = !isEmpty(data.telephone) ? data.telephone : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(!Validator.isLength(data.nom, { min: 2, max: 30 })) {
        errors.nom = 'Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.nom)) {
        errors.nom = 'nom field is required';
    }
     if(Validator.isEmpty(data.pseudo)) {
        errors.pseudo = 'pseudofield is required';
    }
    if(!Validator.isLength(data.prenom, { min: 2, max: 30 })) {
        errors.prenom = 'prenom must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.prenom)) {
        errors.prenom = 'prenom field is required';
    }

    if(Validator.isEmpty(data.birthday)) {
        errors.birthday = 'birthday is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}