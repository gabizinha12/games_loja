const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model("usuarios")
const Produto = mongoose.model("produtos")
const bcrypt = require('bcrypt')
const passport = require('passport')


router.get('/registro', (req,res) => {
    res.render('usuarios/registro')
})

router.post('/registro', (req,res) => {
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: 'Nome inválido!'})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({texto: 'Email inválido!'})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({texto: 'Senha inválida!'})
    }
    if(req.body.senha.length < 4) {
        erros.push({texto: 'Senha muito curta!'})
    }
    if(req.body.senha != req.body.senha2) {
        erros.push({texto: 'Senhas não coincidem'})
    }
    if(erros.length > 0) {
      res.render('usuarios/registro', {erros: erros})
    } else {
       Usuario.findOne({email: req.body.email}).then((usuario) => {
           if(usuario){
            req.flash("error_msg", "Já existe uma conta com esse email")
            res.redirect('/usuarios/registro')
           }else {
            const novoUsuario = new Usuario({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            })

            bcrypt.genSalt(10, (erro, salt)=> {
                bcrypt.hash(novoUsuario.senha, salt, (erro,hash) => {
                    if(erro) {
                        req.flash("error_msg", "Houve um erro durante o salvamento")
                        res.redirect('/')
                    }
                    novoUsuario.senha = hash
                    novoUsuario.save().then(() => {
                    req.flash("success_msg", "Usuário criado")
                    res.redirect('/')
                    }).catch((err) => {
                     req.flash("error_msg", "Houve um erro")
                     res.redirect('/usuarios/registro')
                    })
                })
            })

           }
       }).catch((err) => {
           req.flash("error_msg", "Ocorreu um erro")
           res.redirect('/')
       })
    }
})


router.get('/login', (req,res) => {
    res.render('usuarios/login')
})

router.post('/login', (req,res,next) => {
   passport.authenticate("local", {
       successRedirect: '/',
       failureRedirect: '/usuarios/login',
       failureFlash: true
   })(req,res,next)
})

router.get('/produtos', (req,res) => {
    Produto.find().lean().then((produtos) => {
    res.render('usuarios/ver_produto', {produtos: produtos})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro, tente novamente")
        res.redirect('/')
    })
})

router.get('/logout', (req,res) => {
    req.logout()
    req.flash('success_msg', 'Você saiu da sua conta')
    res.redirect('/')
})


module.exports = router;