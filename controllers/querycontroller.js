const Query=require('../models/query')
const nodemailer=require('nodemailer')

exports.add=(req,res)=>{
    const{email,query}=req.body
    const record=new Query({email:email, query:query})
    record.save()
    // console.log(record)
   
}
exports.pageshow=async(req,res)=>{
    const record=await Query.find()   //{status:'wait for reply'} aise filter laga sakte hai
    res.render('admin/query.ejs',{record})
}

exports.emailform=async(req,res)=>{
    const id=req.params.id
    const record=await Query.findById(id)
    res.render('admin/emailform.ejs',{record})
}

exports.emailsend=async(req,res)=>{
    const id=(req.params.id)
    const{emailto,emailfrom,emailsubject,emailbody}=req.body
    let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'datashareme143@gmail.com', // generated ethereal user
      pass: 'ofmykyagthyzdieh', // generated ethereal password
    },
  });
  console.log("Connect to smtp gmail")

    let info = await transporter.sendMail({
        from: emailfrom, // sender address
        to: emailto, // list of receivers
        subject: emailsubject, // Subject line
        text: emailbody, // plain text body
        //html: "<b>Hello world?</b>", // html body
        // attachments:[{
        //     path:filepath
        // }]
    });
    console.log("Email sent")
    await Query.findByIdAndUpdate(id,{status:'Replied'})
    res.redirect('/admin/query')
}

exports.querydelete=async(req,res)=>{
    const id=req.params.id
    await Query.findByIdAndDelete(id)
    res.redirect('/admin/query')
}