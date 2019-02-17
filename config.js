var enviroment = {};

enviroment.development = {
    'port':3000,
    'envName':'development',
    'DB':'mongodb://localhost/singOut'
}

enviroment.production = {
    'port':3000,
    'envName':'production',
    'DB':'mongodb://phirmware:itachi1@ds135061.mlab.com:35061/crypto'
}

// Check for present env
var currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : false;

// Env to export
var envToExport = typeof(enviroment[process.env.NODE_ENV]) == 'object' ? enviroment[process.env.NODE_ENV] : enviroment['development'];

module.exports = envToExport;