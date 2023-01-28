const express = require("express")
const app = express()

const connectDB = require('./db/connect')
require('dotenv').config()
const cors = require("cors")
const students = require('./routes/students')

//! middlewares

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use('/api', students)
//

const port  = 5000
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        // process.setMaxListeners(0)
        app.listen(port, ()=> console.log(`server listen at port ${port}... `))
    } catch (error) {
        console.log(error);
    }
}
start()
