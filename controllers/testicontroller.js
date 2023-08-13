const Testi=require('../models/testi')
const Address=require('../models/address')

exports.testiform=async(req,res)=>{
    const address=await Address.findOne()
    res.render('testiform.ejs',{address})
}
exports.testiadd=(req,res)=>{
    let currentDate=new Date()
    const{quotes,name}=req.body
    if(req.file){
    let filename=req.file.filename    
    const record=new Testi({quotes:quotes,name:name,postedDate:currentDate,img:filename})
    record.save()
    }else{
        filename='user.png'
        const record=new Testi({quotes:quotes,name:name,postedDate:currentDate,img:filename})
        record.save()
    }
    
    res.redirect('/')
}

exports.testipage=async(req,res)=>{
    const record=await Testi.find().sort({postedDate:-1})
    const totaltesti=await Testi.count()
    const totalpublish=await Testi.count({status:'publish'})
    const totalunpublish=await Testi.count({status:'unpublish'})
    res.render('admin/testi.ejs',{record,totaltesti,totalpublish,totalunpublish})
}
exports.testiupdate=async(req,res)=>{
    const id=req.params.id
    const record=await Testi.findById(id)
    let newstatus=null
    if(record.status=='unpublish'){
        newstatus='publish'
    }else{
        newstatus='unpublish'
    }
    await Testi.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/testi')

}
exports.testidelete=async(req,res)=>{
    const id=req.params.id
    await Testi.findByIdAndDelete(id)
    res.redirect('/admin/testi')
}

exports.testisearch=async(req,res)=>{
    const{status}=req.body
    const record=await Testi.find({status:status}).sort({postedDate:-1})
    const totaltesti=await Testi.count()
    const totalpublish=await Testi.count({status:'publish'})
    const totalunpublish=await Testi.count({status:'unpublish'})
    res.render('admin/testi.ejs',{record,totaltesti,totalpublish,totalunpublish})

}
