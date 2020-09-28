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
    res.render('admin/produtos')
})

router.get('/categorias/add', (req,res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req,res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
   new Categoria(novaCategoria).save().then(() => {
       console.log("Categoria salva com sucesso")
   }).catch((err) => {
    console.log(err)
   })
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
       console.log("Produto salva com sucesso")
   }).catch((err) => {
    console.log(err)
   })
})

router.get('/categorias', (req,res) => {
    res.render('admin/categorias')
})

module.exports = router;