const router= require('express').Router()
const regc=require('../controllers/regcontroller')
const bannerc=require('../controllers/bannercontroller')
const servicec=require('../controllers/servicecontroller')
const testic=require('../controllers/testicontroller')
const addressc=require('../controllers/addresscontroller')
const queryc=require('../controllers/querycontroller')

const multer=require('multer')
let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+file.originalname)
    }   
})
let upload=multer({
    storage:storage,
    limits:{fileSize:4*1024*1024 }
})
function handlelogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/admin/')
    }
}

router.get('/',regc.adminlogin)
router.post('/', regc.logincheck)
router.get('/dashboard',handlelogin, regc.dashboard)
router.get('/logout',regc.logout)
router.get('/banner',handlelogin,bannerc.adminbanner )
router.get('/bannerupdate/:id',handlelogin, bannerc.adminbannerupdateform)
router.post('/bannerupdate/:id',handlelogin,upload.single('img'),bannerc.bannerupdate)
router.get('/service',handlelogin, servicec.adminservicepage)
router.get('/serviceadd',handlelogin,servicec.adminserviceform)
router.post('/serviceadd',handlelogin,upload.single('img'),servicec.serviceadd)
router.get('/servicestatusupdate/:id',handlelogin,servicec.servicestatusupdate)
router.get('/servicedelete/:id',handlelogin,servicec.delete)
router.post('/service',handlelogin,servicec.servicesearch)
router.get('/testi',handlelogin,testic.testipage)
router.post('/testi',handlelogin,testic.testisearch)
router.get('/testistatusupdate/:id',handlelogin,testic.testiupdate)
router.get('/testidelete/:id',handlelogin,testic.testidelete)
router.get('/address',handlelogin,addressc.addresspage)
router.get('/addressupdate/:id',handlelogin,addressc.addupdateform)
router.post('/addressupdate/:id',handlelogin,addressc.addupdate)
router.get('/query',handlelogin,queryc.pageshow)
router.get('/queryreply/:id',handlelogin,queryc.emailform)
router.post('/queryreply/:id',handlelogin,queryc.emailsend)
router.get('/querydelete/:id',handlelogin,queryc.querydelete)



module.exports=router