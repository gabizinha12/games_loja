const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Carrinho = new Schema({
    id: {
        type: String
    }
})

mongoose.model("carrinho", Carrinho)