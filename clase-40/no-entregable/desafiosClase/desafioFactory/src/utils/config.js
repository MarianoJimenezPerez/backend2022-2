import dotenv from 'dotenv';
dotenv.config();

// console.log(process.env);

const config  = {
    mongodb: {
        connstr: `mongodb://${process.env.HOSTDB || 'localhost'}:${process.env.PORTDB || 27017}/clase40`,
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

export default config;