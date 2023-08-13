const Reg=require('../models/reg')

exports.adminlogin=(req,res)=>{
    // res.send("Admin Page")
    res.render('admin/login.ejs',{message:'', css:''})
}
exports.logincheck=async(req,res)=>{
    const{username, pass}=(req.body)
    const usercheck=await Reg.findOne({username:username})
    if(usercheck!==null){  
        if(usercheck.password==pass){
            req.session.isAuth=true
        res.redirect('/admin/dashboard')
        }else{
            res.render('admin/login.ejs', {message:'Wrong Credential', css:'danger'})
        }
    }else{
        res.render('admin/login.ejs', {message:'Wrong Credential', css:'danger'})
    }
}

exports.dashboard=(req,res)=>{
    res.render('admin/dashboard.ejs')
}

exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/admin')
}