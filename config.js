var enviroment = {};

enviroment.development = {
    'port':3000,
    'envName':'development',
    'DB':'mongodb://localhost/singOut'
}

enviroment.production = {
    'port':process.env.PORT,
    'envName':'production',
    'DB':'mongodb://localhost/singOut'
}

// Check for present env
var currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : false;

// Env to export
var envToExport = typeof(enviroment[currentEnviroment]) == 'object' ? enviroment[currentEnviroment] : enviroment['development'];

module.exports = envToExport;