import dotenv from 'dotenv';
dotenv.config();

let obj = {
    port: process.env.PORT,
    logger: process.env.LOG,
    hostdb: process.env.HOSTDB,
    portdb: process.env.PORTDB
}

console.log(obj);

const config  = {
    db: {
        connstr: `mongodb://${process.env.HOSTDB || 'localhost'}:${process.env.PORTDB || 27017}/ecommerce`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    srv: {
        port: process.env.PORT,
        logger: process.env.LOG || 'DEV'
    }
}

export default config;