const mongoose=require('mongoose')

const QuerySchema=mongoose.Schema({
    email:String,
    query:String,
    status:{type:String,default:'wait for reply'}
})
module.exports=mongoose.model('query',QuerySchema)