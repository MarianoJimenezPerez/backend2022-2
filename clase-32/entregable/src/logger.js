const log4js = require('log4js');

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'errores.log' },
    archivoDebug: { type: 'file', filename: 'debug.log' },
    archivoWarn: { type: 'file', filename: 'warn.log' },
    //Se difine los niveles
    loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
    loggerArchivoDebug: { type: 'logLevelFilter', appender: 'archivoDebug', level: 'debug' },
    loggerArchivoWarn: { type: 'logLevelFilter', appender: 'archivoWarn', level: 'warn' },
    loggerArchivoErrores: { type: 'logLevelFilter', appender: 'archivoErrores', level: 'error' }
  },
  categories: {
    default: {
      appenders: ['loggerConsola'], level: 'all'
    },
    prod: {
      appenders: ['loggerArchivoErrores', 'loggerArchivoDebug', 'loggerArchivoWarn'], level: 'all'
    }
  }
})

let logger = null

if (process.env.NODE_ENV === 'PROD') {
  logger = log4js.getLogger('prod');
} else {
  logger = log4js.getLogger();
}

module.exports = logger