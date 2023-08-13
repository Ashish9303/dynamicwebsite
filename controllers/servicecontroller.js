const Service=require('../models/service')
const Address=require('../models/address')


exports.adminservicepage=async(req, res)=>{
    const record=await Service.find().sort({postedDate:-1})
    const totalservice=await Service.count()
    const publishservice=await Service.count({status:'publish'})
    const unpublishservice=await Service.count({status:'unpublish'})
    res.render('admin/service.ejs', {record,totalservice,publishservice,unpublishservice})
}
exports.adminserviceform=(req,res)=>{
    res.render('admin/adminserviceform.ejs')
}

exports.serviceadd=(req, res)=>{
    const{sname,desc,ldesc}=req.body
    let currentdate=new Date()
    const filename=req.file.filename
    const record=new Service({name:sname,desc:desc,ldesc:ldesc,img:filename,postedDate:currentdate})
    record.save()
    res.redirect('/admin/service')
}
exports.servicestatusupdate=async(req,res)=>{
       const id=req.params.id
       const record=await Service.findById(id)
       let newstatus=null
       if(record.status=='unpublish'){
            newstatus='publish'
       }else{
        newstatus='unpublish'
       }
       await Service.findByIdAndUpdate(id,{status:newstatus})
       res.redirect('/admin/service')
}
exports.delete=async(req,res)=>{
        const id=req.params.id
        await Service.findByIdAndDelete(id)
        res.redirect('/admin/service')
}

exports.servicemoredetails=async(req,res)=>{
        const id=req.params.id
        const record=await Service.findById(id)
        const address=await Address.findOne()
        res.render('servicemore.ejs',{record,address})
}

exports.servicesearch=async(req,res)=>{
    const{status}=req.body
    const record=await Service.find({status:status}).sort({postedDate:-1})
    const totalservice=await Service.count()
    const publishservice=await Service.count({status:'publish'})
    const unpublishservice=await Service.count({status:'unpublish'})
    res.render('admin/service.ejs', {record,totalservice,publishservice,unpublishservice})

}