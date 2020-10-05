const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Produto = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    },
    descricao: {
      type: String,
      required: true
    },
    preco: {
        type: Number,
        required: true
    }

})

mongoose.model("produtos", Produto)
