const express= require('express')// function
const app=express()//module
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const frontendrouter=require('./routers/frontendrouter')
const adminrouter=require('./routers/adminrouter')
const mongoose=require('mongoose')
const session=require('express-session')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)    



app.use(session({
    secret:process.env.KEY,
    resave:false,
    saveUninitialized:false
}))
app.use('/admin', adminrouter)
app.use(frontendrouter)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.listen(process.env.PORT,()=>{console.log("server run on port 8000")})









