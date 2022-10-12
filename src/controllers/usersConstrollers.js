const {loadUsers , storeUsers } = require ('../data/db_Module');
const {validationResult} = require('express-validator'); 
const {hashSync}= require('bcryptjs');
const fs = require('fs');
const path = require('path');

module.exports = {
    register : (req,res) => {
        return res.render('users/register')
    },
    processRegister : (req,res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            const {firstName, lastName, email, password, password2, phone, direction, heigth, location, province,imgUsers } = req.body;
            const users = loadUsers();
    
            const newUser = {
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                ...req.body,
                firstName : firstName.trim(),
                lastName : lastName.trim(),
                phone: +phone,
                email : email.trim(), 
                password : hashSync(password.trim(),10),
                password2 : null,
                direction : direction.trim(),
                heigth : +heigth,
                location :location.trim(),
                province : province.trim(),
                imgUsers: users.imgUsers
                
            };

             // inicio session una vez creado el usuario
               
    
            const usersModify = [...users, newUser];
            storeUsers(usersModify);
            return res.redirect('/users/login')
        }else {
            return res.render('users/register', {
                errors : errors.mapped(),
                old : req.body
            })
        }
    
    },

    login : (req,res) => {
        return res.render('users/login')
    }, 
    processLogin : (req, res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let {id, email, password} = loadUsers().find(user => user.email === req.body.email);
        req.session.login= {id, email, password} 
            return res.redirect('/')
        }else {
            return res.render('users/login', {
                errors : errors.mapped(), 
                old: req.body
            })
        }
    },

    profile: (req, res) => {
        const users = loadUsers();
        const id = req.session.login?.id;
        const user = users.find((user) => user.id === +id);
        return res.render("users/profile", {
        title: "Garras Amigas | Mi perfil",
        user,
        });
        // req.session.login = {
        //     id: newUser.id,
        //     firstName: newUser.firstName,
        //     lastname: newUser.lastname,
        //     phone: newUser.phone,
        //     email : newUser.email, 
        //     password : newUser.password,
        //     direction : newUser.direction,
        //     heigth : newUser.heigth,
        //     location : newUser.location,
        //     province : newUser.province,
        //     imgUsers:  imgUsers ? imgUsers : ['default.png']
        // };
    },

    editProfile: (req, res) =>{
        return res.send(req.body)
    },
    logout: (req, res) => {
    req.session.destroy();
    res.cookie('garrasAmigas', null, { maxAge: -1 });
    return res.redirect("/");
    },


}