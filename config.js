var enviroment = {};

enviroment.development = {
    'port':3000,
    'envName':'development',
    'DB':'mongodb://mongodb/singOut'
}

enviroment.production = {
    'port':process.env.PORT || 3000,
    'envName':'production',
    'DB': process.env.DB_URL
}

// Check for present env
var currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : false;

// Env to export
var envToExport = typeof(enviroment[currentEnviroment]) == 'object' ? enviroment[currentEnviroment] : enviroment['development'];

module.exports = envToExport;
