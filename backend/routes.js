module.exports = (app, passport) => {
//direcciones de las paginas
app.get('/', (req, res) => {
    res.render('home')

});
app.get('/contactenos', (req, res) => {
    res.render('contact')
});
app.get('/signin', (req, res) => {
    res.render('signin', {
        message: req.flash('signinMessage')
    });
});

app.get('/product/create', (req, res) => {
    res.render('product/create', {
        //message: req.flash('signinMessage')
    });
});
app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
   })) ;
app.post('/signup', passport.authenticate('local-signup', {
 successRedirect: '/profile',
 failureRedirect: '/signup',
 failureFlash: true
})) ;

app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {
        user: req.user
        
    });    
    
});
app.get('/signup', (req, res) => {
    res.render('signup')
    req.flash('signupMessage')
});
app.get('/acercade', (req, res) => {
    res.render('about')
});
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/signup');
    }
}

};