const {check, body }= require('express-validator');
const{loadUsers}= require('../data/db_Module');

module.exports = [
    check('firstName')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage('Minimo 2 caracteres').bail()
        .isAlpha().withMessage('Solo caracteres alfabeticos'),

    check('lastName')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage('Minimo 2 caracteres').bail()
        .isAlpha().withMessage('Solo caracteres alfabeticos'),

        check('phone')
        .notEmpty().withMessage('El telefono es obligatorio').bail()
        .isNumeric({
            min: 10,
            max : 10
        }).withMessage('Minimo 10 caracteres').bail(),


    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email valido').bail()
        .custom((value, {req}) => {
            const user = loadUsers().find(user => user.email === value);
            if(user){
                return false
            }else{
                return true
            } 
        }).withMessage('El email ya se encuentra registrado'),

    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({
            min : 6,
            max : 12
        }).withMessage('La contraseña debe tener entre  6 y 12 caracteres'),

    body('password2')
        .notEmpty().withMessage('Debes confirmar contraseña').bail()
        .custom((value, {req}) => {
            if(value !== req.body.password){
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinsiden'),

    check('direction')
        .notEmpty().withMessage('La direccion es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage('Minimo 2 caracteres').bail()
        .isAlpha().withMessage('Solo caracteres alfabeticos'),

    check('heigth')
        .notEmpty().withMessage('La altura es obligatorio').bail()
        .isNumeric({
            min: 2
        }).withMessage('Minimo 2 caracteres').bail(),

    check('postal')
        .notEmpty().withMessage('El codigo pastal es obligatorio').bail()
        .isNumeric({
            min: 2
        }).withMessage('Minimo 2 caracteres').bail(),

    check('location')
        .notEmpty().withMessage('La localidad es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage('Minimo 2 caracteres').bail()
        .isAlpha().withMessage('Solo caracteres alfabeticos'),

    check('province')
        .notEmpty().withMessage('La provincia es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage('Minimo 2 caracteres').bail()
        .isAlpha().withMessage('Solo caracteres alfabeticos')


    ]

