/*

PASSPORT
¿De qué se trata?
    -Passport es un middleware de autenticación de NodeJS.
    -Cumple únicamente la función de autenticar solicitudes, por lo que delega todas las demás funciones a la aplicación. Esto mantiene el código limpio y fácil de mantener.
    -Passport reconoce los distintos métodos de login utilizados actualmente, por lo que sus mecanismos de autenticación se empaquetan como módulos individuales. Entonces, no es necesario crear dependencias que no se vayan a utilizar.
    -Cada uno de estos mecanismos se llaman strategies.

Strategies
Cada strategy tiene un módulo distinto de NodeJS para instalar.
Las strategy disponibles son:
        -passport-local para autenticación de usuarios mediante nombre de usuario y contraseña.
        -passport-openid para autenticación mediante OpenId (estándar abierto para la autenticación federada).
        -passport-oauth para autenticación mediante API de otros proveedores como de redes sociales.

Empezar a utilizar Passport-local
En primer lugar debemos instalar el módulo passport y el de  passport-local
    npm i passport
    npm i passport-local

    requerir modulos:

    const session = require('express-session');
    const LocalStrategy = require('passport-local').Strategy;
    const passport = require('passport');


    Además, debemos instalar todas las otras dependencias que se muestran a continuación para el siguiente punto:
    "bcrypt": "^5.0.1",
    "express": "^4.17.1",
    "express-handlebars": "^5.3.3",
    "express-session": "^1.17.2",
    "mongoose": "^6.0.5",
    "passport": "^0.4.1",
    "passport-local": "^1.0.0"

passport.use('login', new LocalStrategy(                              
 (username, password, done) => {
   User.findOne({ username }, (err, user) => {
     if (err)                                                         
       return done(err);

     if (!user) {
       console.log('User Not Found with username ' + username);
       return done(null, false);
     }

     if (!isValidPassword(user, password)) {
       console.log('Invalid Password');
       return done(null, false);
     }

     return done(null, user);
   });
 })
);

Se define una nueva instancia de LocalStrategy y se la carga mediante el método passport.use( ).
El primer parámetro es el nombre de la strategy (“login” en este caso) y el segundo es una instancia de la estrategia que se desea usar (LocalStrategy en este caso)
LocalStrategy espera encontrar por defecto las credenciales de usuario en los parámetros nombre de usuario ‘username’ y contraseña ‘password’ (si se definen con otros nombres, no los encontrará!)
Buscamos el usuario por su username en la base de datos mediante User.findOne( ).
Utilizamos el callback de verificación done en el return para devolver lo que corresponda.
Si el usuario se encuentra en la base de datos y es válido se devuelve en el done : null (indicando que no hubo error) y el usuario encontrado user.
La función isValidPassword es:

    function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
    }


Configurar LocalStrategy de signup
Para crear la instancia de strategy para el registro de nuevo usuario, es similar al de login. La diferencia es que primero chequeamos si ya existe o no ese usuario.
    -Si no existe, creamos un usuario nuevo y lo guardamos en la base de datos.
    -Si ya existe, devolvemos un mensaje que lo informe, dando error al registrar.

passport.use('signup', new LocalStrategy({
 passReqToCallback: true
},
 (req, username, password, done) => {
   User.findOne({ 'username': username }, function (err, user) {

     if (err) {
       console.log('Error in SignUp: ' + err);
       return done(err);
     }

     if (user) {
       console.log('User already exists');
       return done(null, false)
     }

     const newUser = {
       username: username,
       password: createHash(password),
       email: req.body.email,
       firstName: req.body.firstName,
       lastName: req.body.lastName,
     }
     User.create(newUser, (err, userWithId) => {
       if (err) {
         console.log('Error in Saving user: ' + err);
         return done(err);
       }
       console.log(user)
       console.log('User Registration succesful');
       return done(null, userWithId);
     });
   });
 })
)

function createHash(password) {
    return bCrypt.hashSync(
            password,
            bCrypt.genSaltSync(10),
            null);
}


Serializar y deserializar
    -Para restaurar el estado de autenticación a través de solicitudes HTTP, Passport necesita serializar usuarios y deserializarlos fuera de la sesión.
    Esto se hace de modo que cada solicitud subsiguiente no contenga las credenciales del usuario anterior.
    -Se suele implementar proporcionando el ID de usuario al serializar y consultando el registro de usuario por ID de la base de datos al deserializar.
    -Los métodos que proporciona Passport para esto son serializeUser y deserializeUser.
    -El código ejemplo de ambos métodos se muestra a continuación.
    -Se puede ver que el método serializeUser utiliza el id del usuario y el deserializeUser utiliza el objeto de usuario, como lo mencionamos antes.

Iniciar passport
const app = express();

app.use(session({
 secret: 'keyboard cat',
 cookie: {
   httpOnly: false,
   secure: false,
   maxAge: config.TIEMPO_EXPIRACION
 },
 rolling: true,
 resave: true,
 saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

Debemos inicializar con app.use( ) express y express-session.
Además, debemos inicializar passport como se muestra en el código.


Definir las rutas

//index
app.get('/'m routes.getRoot);

//login
app.get('/login', reoutes.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin);
app.get('/faillogin', routes.getFaillogin);

//signup
app.get('/signup', routes.getSignup)
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), routes.postSignup);
app.get('/failsignup', routes.getFailsignup);

//logout
app.get('/logout', routes.getLogout);

//fail route
app.get('*', routes.failRoute);

Definimos las rutas de index, login, singup, logout y fail route. En las rutas por post de login y signup, en las que se procesan los datos ingresados en los formularios, utilizamos como middleware el método authenticate de passport, con el nombre de la LocalStrategy configurada como primer parámetro, y a dónde redirigir en caso de falla como segundo.


Métodos definidos en las rutas

//index
function getRoot(req, res) {
    res.send('Bienvenido')
}

//login
function getLogin(req, res) {
    if(req.isAthenticated()){
        let user = req.user;
        console.log('User logueado');
        res.render('profileUser', {user});
    } else {
        console.log('User no logueado');
        res.render('login');
    }
}

//signup
function getSignup(req, res) {
    res.render('signup');
}


A continuación, está el código de ejemplo para el controller de los métodos de las rutas que definimos en la diapositiva anterior.
Observamos que las rutas por get muestran una vista o un mensaje.
En getLogin primero verifica si ya está logueado, mediante el método isAuthenticated del request req que nos da passport.


//process login
function postLogin (req, res) {
    let user = req.user;
    res.render('profileUser');
}

//process signup
function postSignup (req, res) {
    let user = req.user;
    res.render('profileUser');
}

function getFaillogin (req, res) {
    console.log('Error en el login');
    res.render('loginError', {});
}

function getFailsignup (req, res) {
    console.log('Error en el signup');
    res.render('signupError', {});
}

//logout
function getLogout (req, res) {
    res.logout();
    res.render('index');
}

function failRoute (req, res) {
    res.status(400).render('routingError', {})
}

Las rutas por post solo muestran una vista ya que el inicio de sesión en sí lo realiza directo passport con el middleware passport.authenticate.
Para el getLogout se utiliza el método logout del request req que nos da passport.


Autorizar rutas protegidas
    -Mediante middlewares, podemos proteger distintas rutas, de modo que solo se pueda acceder si hay un usuario logueado.
    -Para esto, usamos nuevamente req.isAuthenticated( ). Si existe, entonces podemos continuar mediante next( ). Si no existe, redirigimos al login.

function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){  //retorna true si el usuario está logueado
        next();
    } else {
        res.redirect('/login');
    }
}

En la o las ruta/s que queremos proteger, se agrega el middleware que vimos en la diapositiva anterior. Queda entonces, como se muestra en el siguiente código.

app.get('/ruta-protegida', checkAuthentication, (req, res) => {
    // haz algo solo si el usuario está identificado
    let user = req.user;
    console.log(user);
    res.send('<h1>Ruta ok!</h1>');
})

*/

