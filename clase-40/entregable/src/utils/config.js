/* --------------------------------Modulos-------------------------------- */

const dotenv = require('dotenv');
dotenv.config();

/* --------------------------------Config-------------------------------- */

const config  = {
    mongodb: {
        connstr: `mongodb+srv://marianoroot:${process.env.DBPASS}@ecommerce.b7leh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    filedb: {
        pathdb: './DB'
    },
    srv: {
        port: process.env.PORT,
        logger: process.env.LOG || 'DEV',
        persistencia: 'memoria'
    }
}

module.exports = config;