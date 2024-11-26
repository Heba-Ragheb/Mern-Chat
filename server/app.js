const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const uri = "mongodb+srv://hebaragheb02:4wGLVCKIckTjFwSK@cluster0.l3ynq.mongodb.net/"
const app = express()
const userRouter = require('./Routers/user')
app.use(bodyParser.json())
const conectDB = async ()=>{
    try {
        mongoose.set('strictQuery',false)
        mongoose.connect(uri)
        console.log("connected")
    } catch (error) {
        console.log(error)
        process.exit()
    }
}
conectDB()
app.use('/',userRouter)
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//4wGLVCKIckTjFwSK