const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
require("../models/Produto")
const Categoria = mongoose.model("categorias")
const Produto = mongoose.model("produtos")
const multer = require('../models/multer')
const {eAdmin} = require('../helpers/eAdmin')

router.get('/', (req,res) => {
    res.render('admin/index', {layout: false})
})

router.get('/produtos',  (req,res) => {
    Produto.find().lean().then((produtos) => {
        res.render('admin/produtos', {produtos: produtos})
    }).catch(() => {
        req.flash("error_msg", "Ocorreu um erro")
        res.redirect("/admin")
    })
})

router.get('/categorias/add', eAdmin, (req,res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', eAdmin, (req,res) => {
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

router.get('/produtos/add',  (req,res) => {
    res.render('admin/addprodutos')
})

router.post('/produtos/novo', multer.single('Img'), (req,res) => {
    const novoProduto = {
        nome: req.body.nome,
        slug: req.body.slug,
        descricao: req.body.descricao,
        preco: req.body.preco,
        img: req.file.filename
    }
   new Produto(novoProduto).save().then(() => {
        req.flash("success_msg", "Produto salvo com sucesso" )
       res.redirect("/admin/produtos")
   }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao salvar")
    res.redirect("/admin/produtos")
   })
})

router.get('/categorias/edit/:id', eAdmin, (req,res) => {
    Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Incapaz de editar categoria")
        res.redirect("/admin/categorias")
    })
})

router.get('/produtos/edit/:id',  (req,res) => {
    Produto.findOne({_id: req.params.id}).lean().then((produto) => {
        res.render("admin/editprodutos", {produto: produto})
    }).catch((err) => {
        req.flash("error_msg", "Incapaz de editar produto")
        res.redirect("/admin/produtos")
    })
})


router.post('/categorias/edit', eAdmin, (req,res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug
          
        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso")
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição")
            res.redirect('/admin/categorias')

        })


    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar categoria")
        res.redirect("/admin/categorias")
    })
})

router.post('/produtos/edit', multer.single('Img'), (req,res) => {
    Produto.findOne({_id: req.body.id}).then((produto) => {
        produto.nome = req.body.nome
        produto.slug = req.body.slug
        produto.preco = req.body.preco
        produto.descricao = req.body.descricao
        produto.img = req.file.filename


        produto.save().then(() => {
            req.flash("success_msg", "Produto editado com sucesso")
            res.redirect('/admin/produtos')
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição")
            res.redirect('/admin/produtos')
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar produto")
        res.redirect("/admin/produtos")
    })

})

router.post('/categorias/deletar', eAdmin, (req,res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso")
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash("error_msg", "Ocorreu um erro inesperado")
    })

})

router.post('/produtos/deletar',  (req,res) => {
    Produto.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Produto deletado com sucesso")
        res.redirect('/admin/produtos')
    }).catch((err) => {
        req.flash("error_msg", "Ocorreu um erro inesperado")
    })
})

router.get('/categorias', eAdmin, (req,res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch(() => {
        req.flash("error_msg", "Ocorreu um erro")
        res.redirect("/admin")
    })
})

module.exports = router;