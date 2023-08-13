const mongoose=require('mongoose')//module

const bannerSchema=mongoose.Schema({
    title: String,
    desc: String,
    ldesc:String,
    img:String,
})


module.exports= mongoose.model('banner',bannerSchema )