 

(function () {
    var App = {
        Data: {
            id: 0
        },
        Controls: {
            nombre: document.querySelector('.nombre'),
            apellido: document.querySelector('.apellido'),
            email: document.querySelector('.email'),
            password: document.querySelector('.password'),
            direccion: document.querySelector('.direccion'),
            pais: document.querySelector('.pais'),
            register: document.querySelector('.registrar'),
            caja: document.querySelector('.caja'),
            //cadena: document.querySelector('.cadena'),

        },
        Handlers: {

            OnClick: function (event) {

                var data = {
                    nombre: App.Controls.nombre.value,
                    apellido: App.Controls.apellido.value,
                    email: App.Controls.email.value,
                    password: App.Controls.password.value,
                    direccion: App.Controls.direccion.value,
                    pais: App.Controls.pais.value
                }

                event.preventDefault();


                $.ajax({
                    type: 'POST',
                    url: '/user/create',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(data),
                }).then(function (res) {
                    App.Controls.caja.innerHTML = '';
                    App.Methods.get_user();
                    console.log(res);
                })
                    .catch(
                        function (error) {
                            App.Controls.email.innerHTML = error;
                        }
                    );
                console.log(event);
            },
            OnClear: function () {
                App.Controls.value = '';
                App.Controls.data.innerHTML = ``;
                App.Controls.nombre.innerHTML = ``;
            },

        },
        Methods: {
            init: function () {
                //App.Methods.initExceptions();
                App.Methods.OnClick();

                App.Data.id = window.location.href;
                var url = jQuery(location).attr('href');
                var arr = url.split('/');
                App.Data.id = arr[4];// cuando vas a editarlas
                App.Data.id = arr[4];//cuando vas eliminar algo
                console.log(isNaN(App.Data.id));
                if (App.Data.id != null) {
                    App.Methods.get_one_user();
                    App.Methods.delete_user();
                } else {
                    App.Methods.get_user();
                }
            },
            initExceptions: function () {
                App.Exceptions.UserException.prototype.toString = function () {
                    return `[${this.date}] ${this.name}: ${this.message}`;
                };
            },
            OnClick: function () {

                App.Controls.register.addEventListener('click', App.Handlers.OnClick)
                //App.Controls.data.addEventListener('click', App.Handlers.OnClick)
            },

            get_user: function () {
                //get
                $.ajax(
                    {
                        url: '/user/all',
                        method: 'GET'
                    }
                ).then((data) => {
                    console.log(data.user);
                    for (let index = 0; index < data.user.length; index++) {
                        App.Controls.caja.innerHTML += '<br>' + '<a  href="/usuario/' + data.user[index]._id + '">' + data.user[index].nombre + '</a>' + 
                        '<a  href="/usuario/delete/' + data.user[index]._id + '">Eliminar</a>';
                    }
                }).catch((err) => {

                });

            },

            get_one_user: function () {

                $.ajax(
                    {
                        url: '/user/' + App.Data.id,
                        method: 'GET'
                    }
                ).then((data) => {
                    App.Controls.nombre.value = data.user.nombre;
                    App.Controls.apellido.value = data.user.apellido;
                    App.Controls.email.value = data.user.email;
                    App.Controls.password.value = data.user.nombre;
                    App.Controls.direccion.value = data.user.nombre;
                    App.Controls.pais.value = data.user.nombre;
                    console.log(data.user);
                }).catch((err) => {
                    console.log(err);
                });

            },

            delete_user : function(){
                $.ajax({ url: `/user/delete/${App.Data.id}`, method: "DELETE" })
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (err) {
                   
                });
            }
            //OnClear: function() {
            //  App.Controls.limpiar.addEventListener('click', App.Handlers.OnClear);
            // }
        },

    }
    App.Methods.init();

})();