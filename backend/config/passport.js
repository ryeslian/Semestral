const localStrategy = require('passport-local').Strategy;

const User = require('../mdelos/model_user');

module.exports = function(passport){
    passport.serializeUser(function (user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
//registrar usuario
    passport.use('local-signup' , new localStrategy({
        usernameField: 'mail',
        passwordField: 'password',
        passReqToCallback: true

    }, 
    function (req, email, password, done){
        User.findOne({'local.email':email}, function(err, user){
            if (err){return done(err);}
            if (user){
                return done(null, false, req.flash('signupMessage', 'Ya existe '))
            }else{
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err){
                    if(err){
                        throw err;
                    }
                    return done(null, newUser);
                });
            }
        })
    }
    
    ));

//logear usuario
passport.use('local-signin' , new localStrategy({
    usernameField: 'mail',
    passwordField: 'password',
    passReqToCallback: true

}, 
function (req, email, password, done){
    User.findOne({'local.email':email}, function(err, user){
        if (err){return done(err);}
        if (!user){
            return done(null, false, req.flash('signinMessage', 'No existe '))
        } if (!user.validatePassword(password)){
            return done(null, false, req.flash('signinMessage','Password is incorret'));

        }
        return done (null, user);
            });
        
}));

}
