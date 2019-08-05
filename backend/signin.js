(function() {
    var App = {
        Data: {},
        Controls: {
            nombre: document.querySelector('.nombre'),
            apellido: document.querySelector('.apellido'),
            email: document.querySelector('.email'),
            password: document.querySelector('.password'),
            direccion: document.querySelector('.direccion'),
            pais: document.querySelector('.pais'),
            //limpiar: document.querySelector('.'),
           // suma: document.querySelector('.suma'),
            //cadena: document.querySelector('.cadena'),

        },
        Handlers: {
            OnClick: function(event) {
                event.preventDefault();
                console.log(event);
                var data = App.Controls.email.value;
                console.log(data);
                $.ajax({
                        type: 'GET',
                        url: '/product/create',


                    }).then(function(res) {
                        let data ;
                        if (res.data != null) {
                            data.forEach(e => {
                                contents += 'existe'
                                
                            });
                        } else {
                            App.Controls.email.innerHTML = `No existe`;
                            App.Controls.password.innerHTML = ` `;
                        }

                        console.log(res);
                    })
                    .catch(
                        function(error) {
                            App.Controls.email.innerHTML = error;
                        }
                    );
                console.log(event);
            },
            OnClear: function() {
                App.Controls.value = '';
                App.Controls.password.innerHTML = ``;
                App.Controls.nombre.innerHTML = ``;
            },

        },
        Methods: {
            init: function() {
                App.Methods.initExceptions();
                App.Methods.OnCalcular();
                App.Methods.OnClear();
            },
            initExceptions: function() {
                App.Exceptions.UserException.prototype.toString = function() {
                    return `[${this.date}] ${this.name}: ${this.message}`;
                };
            },
            OnCalcular: function() {
                App.Controls.calcular.addEventListener('click', App.Handlers.OnClick)
            },
            OnClear: function() {
                App.Controls.limpiar.addEventListener('click', App.Handlers.OnClear);
            }
        },
        Events: {},
        Helpers: {},
        Exceptions: {
            UserException: function(message) {
                this.message = message;
                this.name = 'UserException';
                this.date = new Date();
            }
        },
    }
    data: {
        nombre, 
        apellido,
        email,
        password,
        direccion,
        pais

    }
    App.Methods.init();
})();