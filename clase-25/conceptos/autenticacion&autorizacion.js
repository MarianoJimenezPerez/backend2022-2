/*
Autenticación

    -Es el proceso de identificación de usuarios para asegurarse su identidad.
    -Existen diversos métodos para probar la autenticación, siendo la contraseña el más conocido y utilizado.
    -Parte del principio de que si el usuario dispone de las credenciales requeridas (por ejemplo, nombre de usuario y contraseña), el sistema puede validar la identidad del usuario y permitir el acceso a los recursos solicitados.

Autorización
    -Define la información, los servicios y recursos del sistema a los que podrá acceder el usuario autenticado.
    -Uno de sus usos más comunes es para generar distintos permisos para el usuario común y el administrador, quienes tendrán acceso a distintos tipo de recursos.
    -Existen distintos métodos para autorizar usuarios.
    Suele utilizarse el método mediante middlewares, donde permitan el acceso según el tipo de usuario autenticado (admin, cliente, etc.).

    Autenticación:
    verifica las identidades, por diferentes métodos (algo que sabemos, algo que tenemos, algo que somos).

    Autorización:
    verifica los permisos que corresponden a cada identidad.

Métodos de autenticación:
    -Usuario y contraseña: Es el método tradicional más utilizado, donde el usuario ingresa username o email y password para autenticarse.
    -Sin contraseña (passwordless): Consiste en que, cada vez que queramos iniciar sesión a un recurso, se nos enviará al email un enlace que nos permitirá acceder sin necesidad de contraseña.
    -Por redes sociales: Varias aplicaciones nos dan como opción iniciar sesión directamente con alguna red social. La ventaja principal es que se usan directamente los datos de esa cuenta social para hacer el inicio de sesión.
    -Datos biométricos: Autentica usuarios mediante huellas dactilares.
    -JWT(JSON Web Token): Este método open source permite la transmisión segura de datos entre las distintas partes. Comúnmente se utiliza para la autorización a partir de un par de claves que contiene una clave privada y una pública. 
    -OAuth 2.0: Permite que mediante una API, el usuario se autentique y acceda a los recursos del sistema que necesita.
*/