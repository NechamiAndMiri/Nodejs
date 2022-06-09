const express = require('express')
const mongoose = require('./mongoosDB')
const path=require('path')

const dotnev=require('dotenv')
dotnev.config()


const user = require('./routes/UserRoutes')
const category = require('./routes/CategoryRoutes')
const order = require('./routes/OrderRoutes')
const product = require('./routes/ProductRoutes');

const app = express()

app.use(express.static('static'))
const port =process.env.PORT




app.use(express.json())

app.use('/user', user)
app.use('/category', category)
app.use('/order', order)
app.use('/product', product)

app.use((req,res)=>
{
    res.status(404).sendFile(path.join(__dirname,'/static/404.html'))
})

app.use((err,req,res,next)=>
{
    res.status(500).send({error:'failed'})
})
app.listen(port, () => {
    console.log("listen")
})
