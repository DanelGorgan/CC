import Joi from 'joi'

require('dotenv').config()

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .default('development'),
    SERVER_PORT: Joi.number()
        .default(8081),
    DB_HOST: Joi.string().required()
        .description('DB host'),
    DB_DATABASE: Joi.string().required()
        .description('DB name')
}).unknown()
    .required()

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema)

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    cryptonSecret: envVars.CRYPTON_SECRET,
    jwtSecret: envVars.JWT_SECRET,
    mongodb: {
        host: envVars.MONGODB_HOST,
        database: envVars.MONGODB_DATABASE,
        port: envVars.MONGODB_PORT,
        username: envVars.MONGODB_USERNAME,
        password: envVars.MONGODB_PASSWORD
    },
}

export default config