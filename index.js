// Módulos

const express = require("express")
const hbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const admin = require("./routes/admin")
const mongoose = require("mongoose")
const app = express();

// configurações 
// body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// handlebars
app.set('view engine', 'hbs')
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname+'/views/layout'}))
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/games_loja', {
    useNewUrlParser: true , 
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB Conectado...");
}).catch((err)=>{
    console.log("Houve um erro: " + err);
});
// rotas
app.use('/admin', admin);


// outros
const port = 8081
app.listen(port, () => {
    console.log("Servidor rodando")
})