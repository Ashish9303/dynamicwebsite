const Address=require('../models/address')

exports.addresspage=async(req,res)=>{
    const record=await Address.findOne()
    res.render('admin/address.ejs',{record})
}
exports.addupdateform=async(req,res)=>{
    const id=req.params.id
    const record=await Address.findById(id)
   res.render('admin/addressupdateform.ejs',{record})
}
exports.addupdate=async(req,res)=>{
    const id=req.params.id
    const{ add,tel,mobile,email,linkedin,insta,twitter,snap,}=req.body
    await Address.findByIdAndUpdate(id,{ add:add,tel:tel,mobile:mobile,email:email,linkedin:linkedin,insta:insta,twitter:twitter,snap:snap,})
    res.redirect('/admin/address')
}