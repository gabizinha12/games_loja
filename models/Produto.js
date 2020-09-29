const mongoose = require("mongoose")
require('@logicamente.info/mongoose-currency-brl').loadType(mongoose);
const BrazilianCurrency = mongoose.Types.BrazilianCurrency;
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
    preco: {
        type: BrazilianCurrency,
        required: true
    }

})

mongoose.model("produtos", Produto)
