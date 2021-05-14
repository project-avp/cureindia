const express=require('express');
const app=express();
const path=require('path');

const mongoose=require('mongoose');
const patient = require('./models/patient');
const doctor = require('./models/doctor');
mongoose.connect('mongodb://localhost:27017/cureIndiaP', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("mongo CONNECTION OPEN!!!") 
})
.catch(err=>{
    console.log("mongo ERROR")
    console.log(err)
})
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
//New Entry patient
app.get('/products/new',(req,res)=>{
    res.render('products/new')
})
// //total data show
app.get('/products',async (req,res)=>{
    const products= await patient.find({});
    res.render('products/index',{products});
})
//Taking data from form
app.post('/products',async(req,res)=>{
    const newPatient=new patient(req.body);
    await newPatient.save();
    //console.log(newPatient);
    res.redirect(`/patient/${newPatient._id}`)
})
//showing details of individual
app.get('/patient/:id',async(req,res)=>{
    const {id}=req.params;
    const pat= await patient.findById(id)
    console.log(pat);
    res.render('products/show',{pat});
})
//New Entry for Doctor
app.get('/Doctor',(req,res)=>{
    res.render('products/newdoct');
})
//Data from doctor's signup page
app.post('/doctorSignup',async(req,res)=>{
    const newdoct=new doctor(req.body);
    await newdoct.save();
    console.log(newdoct);
    res.redirect(`/DisplayDoct`);
    // res.send("Data posted");
})
//Displaying list of doctor
app.get('/DisplayDoct',async (req,res)=>{
    const doctList= await doctor.find({});
    res.render('products/Doctorshow',{doctList});
})
//Individual details of Doctor sahab
app.get('/doctor/:id',async(req,res)=>{
    const {id}=req.params;
    const doct= await doctor.findById(id)
    console.log(doct);
    res.render('products/inddoct',{doct});
})
app.listen(3000,()=>{
    console.log("Well Done");
})



