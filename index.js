// Módulos

const express = require("express")
const hbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const admin = require("./routes/admin")
const mongoose = require("mongoose")
const flash = require("connect-flash")
const session = require("express-session")
const app = express();
const usuarios  = require("./routes/usuario")
require('./models/Produto')
const Produto = mongoose.model('produtos')

// configurações 
//sessão
app.use(session({
    secret: "loja",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
// Middleware
app.use((req,res,next) => {
   res.locals.success_msg = req.flash("success_msg")
   res.locals.error_msg = req.flash("error_msg")
   next()
})
// body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// handlebars
app.set('view engine', 'hbs')
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname+'/views/layout',  partialsDir  : [
    //  path to your partials
    path.join(__dirname, 'views/partials'),
]}))
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
app.get('/', (req,res) => {
    Produto.find().lean().populate('produto').then((produtos) => {
    res.render('index', {produtos: produtos})
    }).catch((err) => {
        req.flash("error_msg", "Ocorreu um erro")
        res.redirect('/404')
    })
})
app.get('/404', (req,res) => {
    res.send("Erro 404!")
})
app.use('/admin', admin);
app.use('/usuarios', usuarios)


// outros
const port = 8081
app.listen(port, () => {
    console.log("Servidor rodando")
})