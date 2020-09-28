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
    date: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
    }

})

mongoose.model("produtos", Produto)
