const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Carrinho = new Schema({
    _id: {
        type: String
    },
    quantidade: {
        type: Number,
        default: 1
    }
})

mongoose.model("carrinho", Carrinho)