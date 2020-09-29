const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
require("../models/Produto")
const Categoria = mongoose.model("categorias")
const Produto = mongoose.model("produtos")

router.get('/', (req,res) => {
    res.render('admin/index', {layout: false})
})

router.get('/produtos', (req,res) => {
    Produto.find().lean().then((produtos) => {
        res.render('admin/produtos', {produtos: produtos})
    }).catch(() => {
        req.flash("error_msg", "Ocorreu um erro")
        res.redirect("/admin")
    })
})

router.get('/categorias/add', (req,res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req,res) => {
    var erros = [];
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome  == null) {
        erros.push({texto: "Nome inválido"})
    }


    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug  == null) {
        erros.push({texto: "Slug inválido"})
    }


    if(erros.length > 0) {
        res.render("admin/addcategorias", {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
       new Categoria(novaCategoria).save().then(() => {
        req.flash("success_msg", "Categoria salva com sucesso" )
           res.redirect("/admin/categorias")
       }).catch((err) => {
           req.flash("error_msg", "Houve um erro ao salvar")
        res.redirect("/admin")
       })
    }
    
})

router.get('/produtos/add', (req,res) => {
    res.render('admin/addprodutos')
})

router.post('/produtos/novo', (req,res) => {
    const novoProduto = {
        nome: req.body.nome,
        slug: req.body.slug,
        preco: req.body.preco,
    }
   new Produto(novoProduto).save().then(() => {
       res.redirect("/admin/produtos")
   }).catch((err) => {
    console.log(err)
   })
})

router.get('/categorias/edit/:id', (req,res) => {
    res.send("teste")
})

router.get('/produtos/edit/:id', (req,res) => {
    res.send("teste")
})


router.get('/categorias', (req,res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch(() => {
        req.flash("error_msg", "Ocorreu um erro")
        res.redirect("/admin")
    })
})

module.exports = router;