const { cadenaConexion } = require('./backend/config/db');
var express = require('express')
const mongoose = require('mongoose')
var app = express();
const path = require('path');
const body_parse = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const cookie = require('cookie-parser');
const session = require('express-session');
const routes = require('./backend/routes');
const port = 3000;


//config
require('./backend/config/passport')(passport);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(body_parse.urlencoded({ extended: false }));
app.use(body_parse.json({ limit: '50mb' }));
//app.use(cookieParser());
app.use(session({
    secret: 'HourGlass',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// colocar en public las carpetas de style y script
app.use('/public', express.static(path.join(__dirname, '/public')));


//archivo  donde estaran todas las peticiones de cada servicio
app.use(require('./backend/peticiones/router'));

//rutas 
require('./backend/routes')(app, passport);

//peticiones de productos

let url = cadenaConexion();
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Mongo esta conectado');
    });

app.listen(port, () => {
    console.log(`   PUERTO  ${port}`);
});