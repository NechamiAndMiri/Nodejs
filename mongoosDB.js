let mongoose=require('mongoose')
const dotnev=require('dotenv')

class dataBase{
    constructor(){
      dotnev.config()
      const connectionString=process.env.DB_CONN

        mongoose.connect(connectionString)
         // `mongodb://${'srv1:27017'}/${"213547284-Shoshi&Miri"}`)
         
        .then(()=>{
            console.log('database conected')
          }).catch(err=>{
            console.error(err)
          })
    }  
   }
   
   
module.exports = new dataBase();