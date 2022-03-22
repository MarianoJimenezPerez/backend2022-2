/**

¿Qué es Session?
Session es un paquete de Node, el cual permite que una variable sea accesible desde cualquier lugar del sitio. Se almacena del lado del servidor.

Características:

    -La información que se quiera guardar en session se almacena del lado del servidor.
    -Del lado del cliente, se crea un identificador único para poder acceder a esa información desde el navegador.
    -Los datos almacenados en session se borran al cerrar la ventana del navegador.
    -Se utiliza principalmente para guardar los datos de usuario al iniciar sesión.



================Empezando a usar session================
Se debe instalar el módulo de express-session para empezar a utilizar session:

    npm i express-session --save


================Require================

Tiene que ser requerido e incluido en la aplicación en la que se lo va a utilizar.
Es un middleware que se requiere a nivel de aplicación.

    const session = require('express-session');
    app.use(session({
        secret: 'secreto',
        resave: true,
        saveUnitialized: true
    }));

================Guardar datos en session================

app.get('/con-session', (req, res) =>{
    if(req.session.contador){
        res.session.contador++;
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces`);
    } else {
        req.session.contador = 1;
        res.send('Bienvenido!');
    }
})

    -En el else se crea la variable en session llamada “contador” la cual tiene inicialmente un valor de 1.
    -En el if, si ya existe esta variable en session, se aumenta su valor en 1.
    -Tener en cuenta que tanto para inicializar una nueva variable en session como para leer los datos de la misma se utiliza el parámetro de request.


================Eliminar datos de session================

Para eliminar datos de una variable de session, se utiliza el parámetro de request y el método destroy. Como parámetro se pasa un callback.

    app.get('/logout', (req, res) =>{
        req.session.destroy(err => {
            if(!err){
                res.send('Logout ok');
            } else {
                res.send({status: 'Logout ERROR', body: err});
            }
        })
    })

================Login con session================

Para iniciar sesión se verifica que los datos ingresados por el usuario sean los correctos. Si lo es, se guarda en session los datos de este usuario. Además, se puede crear la variable admin, también en session, con el valor de true, lo que indica que el usuario logueado es un administrador

    app.get('/login', (req, res) => {
        const { username, password } = req.query
        if (username !== 'pepe' || password !== 'pepepass') {
            return res.send('login failed')
        }
        req.session.user = username
        req.session.admin = true
        res.send('login success!')
    })

================Middleware de autenticación================
Mediante estos middleware se puede limitar el acceso a determinadas rutas a aquellos usuarios que sean administradores (o, por ejemplo, otras a cualquier usuario logueado).
Si coincide el usuario guardado en session y además es admin, entonces sigue a la ruta, sino devuelve un error.

    function auth(req, res, next) {
        if (req.session?.user === 'pepe' && req.session?.admin) {
            return next();
        }
        return res.status(401).send('error de autorización!');
    };

================Aplicación del middleware================

Al aplicar el auth middleware en la ruta /content, estará accesible únicamente luego de que el usuario haya iniciado sesión.
Además, según el código del middleware, se puede especificar a cierto usuario o cierto tipo de usuario (admin o usuario común, por ejemplo)

    app.get('/privado', auth, (req, res) => {
        res.send('si estas viendo esto es porque ya te logueaste!');
    })


================Logout con session================

Para cerrar sesión, solo basta con aplicar el método destroy de session.
Al borrar los datos almacenados, ya no queda registro de que el usuario haya iniciado sesión. Y en este caso, ya no van a ser accesibles las rutas que tengan el auth middleware.

    app.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.json({ status: 'Logout ERROR', body: err });
            } else {
                res.send('Logout ok!');
            }
        })
    });

*/