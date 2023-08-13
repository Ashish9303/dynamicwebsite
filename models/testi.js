const mongoose=require('mongoose')

const testiSchema=mongoose.Schema({
    img:String,
    quotes:String,
    name:String,
    postedDate:Date,
    status:{type:String,default:'unpublish'}
})

module.exports=mongoose.model('testi',testiSchema)