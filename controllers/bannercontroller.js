const Banner=require('../models/banner')
const Address=require('../models/address')

exports.adminbanner=async(req,res)=>{
    const record=await Banner.findOne()
    res.render('admin/banner.ejs', {record})
}
exports.adminbannerupdateform=async(req,res)=>{
    const id=req.params.id
    const record=await Banner.findById(id)
    res.render('admin/bannerform.ejs',{record})
}
exports.bannerupdate=async(req,res)=>{
    const id=req.params.id
    const{title,desc,ldesc,}=req.body
    if(req.file){
        const filename=req.file.filename
        await Banner.findByIdAndUpdate(id,{title:title,desc:desc,ldesc:ldesc,img:filename})
    }else{
        await Banner.findByIdAndUpdate(id,{title:title,desc:desc,ldesc:ldesc})
    }
    
    res.redirect('/admin/banner')
}
exports.bannermoredetail=async(req,res)=>{
    const record=await Banner.findOne()
    const address=await Address.findOne()
    res.render('bannermore.ejs',{record,address})
}