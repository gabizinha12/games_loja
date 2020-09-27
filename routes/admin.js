const express = require("express")
const router = express.Router()

router.get("/", (req,res) => {
    res.render("admin/index", {layout: false})
})


router.get("/produtos", (req,res) => {
    res.render("admin/produtos")
})

router.get('/categorias/add', (req,res) => {
    res.render("admin/addcategorias")
})

router.get("/categorias", (req,res) => {
    res.render("admin/categorias")
})

module.exports = router;