var express = require('express');
var app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../mdelos/model_user');
const categories = require('../mdelos/model_categoria');
const productosModel = require('../mdelos/model_producto');

var upload = require('express-fileupload');

app.use(upload({ useTempFiles: true }));

/*==========================================
Login
========================================== */

var tiempo = '1h';
var seed = 'proyecto_desarrollo';

app.post('/signin', (req, res) => {

    var request = req.body;

    if (request.password == null || request.email == null) {

        res.json({
            success: false,
            err: 'No se pueden dejar campos en blanco',

        });
    } else {


        user.findOne({ email: request.email }, (err, login) => {
            if (err) {
                res.json({
                    success: false,
                    err
                });
            } else {
                if (!login) {
                    res.json({
                        success: false,
                        err: 'Usuario o Contraseña Invalidas'
                    });
                } else {

                    if (login) {

                        if (!bcrypt.compareSync(request.password, login.password)) {
                            res.json({
                                success: false,
                                err: 'Usuario o Contraseña Invalidas'
                            });
                        } else {
                            /*=====================================
                            Generar token
                            ===================================== */
                            const token = jwt.sign({
                                login
                            }, seed, {
                                expiresIn: tiempo // expires in 1 hours
                            });


                            res.json({
                                success: true,
                                usuario: login,
                                token
                            });
                        }
                    } else {
                        return;
                    }
                }
            }

        });
    }




});
//rutas para el usuario

// crear un usuario
app.post('/signup', (req, res) => {
    var request = req.body;

    let usuario = new user({
        nombre: request.nombre,
        apellido: request.apellido,
        email: request.email,
        password: bcrypt.hashSync(request.password, 10),
        role: request.role,
        direccion: request.direccion,
        pais: request.pais,
        estado: request.estado,
    });


    usuario.save((err, user) => {
        if (err) {
            res.json({
                success: false,
                err
            });
        } else {
            /* user.password = null; */
            res.json({
                success: true,
                user
            })
        }
    });



});

// traer todos los usuarios

app.get('/user/all', (req, res) => {

    user.find({ estado: true })
        .exec((err, user) => {
            if (err) {
                res.json({
                    success: false,
                    err
                });
            } else {

                res.json({
                    success: true,
                    user,

                })
            }

        });
});

// traer un usuario

app.get('/user/:id', (req, res) => {

    var id_usuario = req.params.id;

    user.findById({ _id: id_usuario }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                err: `No se encontro registro con el id_usuario ${id_user}`
            });
        } else {
            res.json({
                success: true,
                user
            });
        }

    });
});

// actualizar usuarios

app.put('/user/update/:id', (req, res) => {
    //underscore pick solo coloca los campos que se quieren actualizar en la base de datos
    var request = req.body;
    var id = req.params.id
    Usuario.findByIdAndUpdate(id, request, { new: true, runValidators: true, context: 'query' }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                err
            });
        }

        res.json({
            success: true,
            user
        });

    });
});

// eliminar usuarios

app.delete('/user/delete/:id', (req, res) => {
    var id = req.params.id;

    user.findByIdAndDelete(id, (err, user) => {
        if (err) {
            res.json({
                success: false,
                err
            });
        }

        if (!user) {
            res.json({
                success: false,
                err: 'Usuario no encontrado'
            })
        }

        res.json({
            success: true,
            user,
        });

    });
});



// rutas para la categoria

//crear categoria

app.post('/category/create', (req, res) => {

    var request = req.body;

    let catego = new categories({
        nombre: request.nombre,
        imagen: request.descripcion,
        estado: request.estado
    });

    catego.save((err, category) => {
        if (err) {
            res.json({
                success: false,
                err
            });
        } else {

            res.json({
                success: true,
                category
            });
        }

    });

});

// traer categorias

app.get('/category/all', (req, res) => {


    categories.find()
        .exec((err, category) => {
            if (err) {
                res.json({
                    success: false,
                    err
                });
            } else {
                res.json({
                    success: true,
                    category,


                });
            }
        });

});

// buscar una categoria por id
app.get('/category/:id', (req, res) => {
    //id de la categoria
    var id_category = req.params.id;

    user.findById({ _id: id_category }, (err, category) => {
        if (err) {
            res.json({
                success: false,
                err: `No se encontro registro con el Id ${id_category}`

            });
        }

        res.json({
            success: true,
            category
        });
    });
});

// eliminar categoria
app.delete('/category/delete/:id', (req, res) => {
    var id_category = req.params.id
    categories.findByIdAndDelete(id_category, (err, category) => {
        if (err) {
            res.json({
                success: false,
                err

            });
        }
        if (category == null) {
            res.json({
                success: false,
                err: {
                    message: 'Categoria no encontrado'
                }
            })
        }

        res.json({
            success: true,
            category
        });
    });
});

// actualizar una categoria
app.put('/category/update/:id', (req, res) => {
    var request = req.body;

    let id_category = req.params.id
    let actualizar = {
        nombre: request.nombre,
        estado: request.estado
    };

    categories.findByIdAndUpdate(id_category, actualizar, { new: true, context: 'query' }, (err, categoDB) => {
        if (err) {
            res.json({
                success: false,
                err

            });
        }



        res.json({
            success: true,
            categoria: categoDB
        });
    });
});

// rutas para los productos


// crear productos
app.post('/product/create', (req, res) => {

    var request = req.body;

    let producto = new productosModel({
        nombre: request.nombre,
        codigo: request.codigo,
        cantidad: request.cantidad,
        precio: request.precio,
        tamano: request.tamano,
        costo_envio: request.costo_envio,
        descripcion: request.descripcion,
        img: request.img,
        estado: request.estado,
        id_categories: request.id_categories,
    });


    producto.save((err, producto) => {
        if (err) {
            res.json({
                success: false,
                err
            });
        } else {

            res.json({
                success: true,
                producto
            });
        }

    });

});

// traer todos los productos
app.get('/product/all', (req, res) => {


    productosModel.find({ estado: true })
        .sort({ _id: 1 })
        .exec((err, productos) => {
            if (err) {
                res.json({
                    success: false,
                    err
                });
            }

            res.json({
                success: true,
                productos


            });
        });
});

//traer un productos

app.get('/product/:id', (req, res) => {
    //id de la categoria
    var id_producto = req.params.id;

    productosModel.findById({ _id: id_producto }, (err, prodcuto) => {
        if (err) {
            res.json({
                success: false,
                err: `No se encontro registro con el Id ${id_producto}`
            });
        }

        res.json({
            success: true,
            prodcuto
        });
    });
});

// buscar los productos por categoria
app.get('/product/category/:id', (req, res) => {

    var id = req.params.id;

    productosModel.find({ id_categories: id, estado: true })
        .exec((err, producto) => {
            if (err) {
                res.json({
                    success: false,
                    err: 'No existe categoria'

                });
            }

            res.json({
                success: true,
                producto,


            });
        });
});

// ELiminar productos
app.delete('/product/delete/:id', (req, res) => {
    var id_producto = req.params.id
    productosModel.findByIdAndDelete(id_producto, (err, producto) => {
        if (err) {
            res.json({
                success: false,
                err

            });
        }
        if (producto == null) {
            res.json({
                success: false,
                err: `El producto con ID ${id_productos} no EXISTE`
            })
        }

        res.json({
            success: true,
            producto
        });
    });
});


// actualizar un Producto
app.put('/product/update/:id', (req, res) => {
    //underscore pick solo coloca los campos que se quieren actualizar en la base de datos
    var request = req.body;

    if (request.img == null) {
        productosModel.findById({ _id: id_producto }, (err, prodcuto) => {
            if (err) {
                res.json({
                    success: false,
                    err: `No se encontro registro con el Id ${id_producto}`
                });
            }
            request.img = prodcuto.img;

        });
    }
    var id_producto = req.params.id
    productos.findByIdAndUpdate(id_producto, request, { new: true, context: 'query' }, (err, productoBD) => {
        if (err) {
            res.status(400).json({
                success: false,
                err: `No se encontro registro con el Id ${id_producto}`
            });
        }

        res.json({
            success: true,
            producto: productoBD
        });

    });
});

//subida de archivo
/*========================================
:tipo = al nombre de la carpeta donde voy a guardar la imagen que son categorias y productos son als dos carpetas y los dos tipos permitidos , el :id es el id de la categoria o producto la cual se va actualizar la imagen
======================================== */
app.put('/cargarImagen/:tipo/:id', (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;

    // validar si existe algun archivo
    if (!req.files) {
        res.json({
            success: false,
            err: 'No se encontro archivo disponible'
        });
    } else {
        let archivo = req.files.archivo;
        let nombre_archivo = archivo.name.split('.');
        let ext = nombre_archivo[1];
        console.log(nombre_archivo);
        //cambiando archivo

        let nombre_save = `${id}-${nombre_archivo[0]}.${ext}`;

        // sube la imagen
        archivo.mv(`public/galeria/${tipo}/${nombre_save}`, (err) => {
            if (err) {
                res.json({
                    success: false,
                    err
                });
            }
        });

        /*   imageneUsuario(id, res, nombre_save); */
        if (tipo === "productos") {

            // codigo para gurdar el nombre a la base de datos.
            productosModel.findById(id, (err, producto) => {

                if (err) {

                    res.status(500).json({
                        exito: false,
                        err
                    });

                }

                if (!producto) {
                    res.status(400).json({

                        exito: false,
                        err: {
                            message: 'El usuario No existe'
                        }
                    });
                }


                producto.img = nombre_save;
                producto.save((err, producto) => {
                    if (err) {
                        res.status(500).json({
                            exito: false,
                            err
                        });
                    }

                    res.json({
                        exito: true,
                        producto
                    })
                });


            });

        } else if (tipo == "categorias") {

            // codigo para gurdar el nombre a la base de datos.
            categories.findById(id, (err, categoria) => {

                if (err) {

                    res.status(500).json({
                        exito: false,
                        err
                    });

                }

                if (!categoria) {
                    res.status(400).json({

                        exito: false,
                        err: {
                            message: 'El usuario No existe'
                        }
                    });
                }


                categoria.imagen = nombre_save;
                categoria.save((err, categoria) => {
                    if (err) {
                        res.status(500).json({
                            exito: false,
                            err
                        });
                    }

                    res.json({
                        exito: true,
                        categoria
                    })
                });


            })
        }
    }


});

/*===========================================================
cuando  haces el get de producto para ver la imagen debes de colocar esta ruta
http://localhost:3000/public/galeria/categorias/'nombre de la imagen'
http://localhost:3000/public/galeria/productos/'nombre de la imagen'
=========================================================== */


/*====================================================
subida de imagen de productos y categoria
 ====================================================*/

module.exports = app;