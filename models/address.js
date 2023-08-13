const mongoose=require('mongoose')

const addSchema=mongoose.Schema({
    add:String,
    tel:Number,
    mobile:Number,
    email:String,
    linkedin:String,
    insta:String,
    twitter:String,
    snap:String,
})

module.exports=mongoose.model('address',addSchema)