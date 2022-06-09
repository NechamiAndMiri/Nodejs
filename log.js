const winston=require('winston');
const winston_mongodb=require('winston-mongodb');
// const { transports } = require('winston');
const dotnev=require('dotenv')
dotnev.config()


const logConfiguration={
    transports:[
        new winston_mongodb.MongoDB({
            level:'error',
            db:process.env.DB_CONN,
            options:{
                useUnifiedTopology:true
            },
            collection:'server_logs'
        }),
        new winston.transports.File({level:'info',
   filename:'logs/website.log'})
    ]
}
const logger=winston.createLogger(logConfiguration);
module.exports = logger