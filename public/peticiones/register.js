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
            register: document.querySelector('#register'),
            // suma: document.querySelector('.suma'),
            //cadena: document.querySelector('.cadena'),

        },
        Handlers: {

            OnClick: function(event) {
                alert("hola mundo");
                var data = {
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    password: password,
                    direccion: direccion,
                    pais: pais
                }
                console.log(data);
                event.preventDefault();
                console.log(event);
                var data = App.Controls.email.value;
                console.log(data);
                $.ajax({
                        type: 'POST',
                        url: '/user/create',
                        contentType: "application/json",
                        data: data
                    }).then(function(res) {
                        let data;
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
                App.Controls.data.innerHTML = ``;
                App.Controls.nombre.innerHTML = ``;
            },
            OnClick: function(event) {
                var data = {
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    password: password,
                    direccion: direccion,
                    pais: pais

                }




                //arreglo


            },



        },
        Methods: {
            init: function() {
                //App.Methods.initExceptions();
                App.Methods.OnClick();
                //App.Methods.OnClear();
            },
            initExceptions: function() {
                App.Exceptions.UserException.prototype.toString = function() {
                    return `[${this.date}] ${this.name}: ${this.message}`;
                };
            },
            OnClick: function() {

                App.Controls.register.addEventListener('click', App.Handlers.OnClick)
                    //App.Controls.data.addEventListener('click', App.Handlers.OnClick)
            },
            //OnClear: function() {
            //  App.Controls.limpiar.addEventListener('click', App.Handlers.OnClear);
            // }
        },

    }
    App.Methods.init();

})();