const router= require('express').Router()
const regc=require('../controllers/regcontroller')
const bannerc=require('../controllers/bannercontroller')
const servicec=require('../controllers/servicecontroller')
const testic=require('../controllers/testicontroller')
const queryc=require('../controllers/querycontroller')
const Banner=require('../models/banner')
const Service=require('../models/service')
const Testi=require('../models/testi')
const Address=require('../models/address')

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

router.get('/', async(req,res)=>{
    // res.send("Frontedn Page")
    const record=await Banner.findOne()
    const servicerecord=await Service.find({status:'publish'})
    const testirecord=await Testi.find({status:'publish'})
    const address=await Address.findOne()
    res.render('index.ejs',{record,servicerecord,testirecord,address})
})

router.post('/',queryc.add)
router.get('/banner',bannerc.bannermoredetail)
router.get('/service/:id',servicec.servicemoredetails)
router.get('/testi',testic.testiform)
router.post('/testi',upload.single('img'),testic.testiadd)


module.exports=router 