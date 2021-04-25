const express=require('express');
const app=express();
const path=require('path');

const mongoose=require('mongoose');
const patient = require('./models/patient');
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
//New Entry
app.get('/products/new',(req,res)=>{
    res.render('products/new')
})
//total data show
app.get('/products',async (req,res)=>{
    const products= await patient.find({});
    res.render('products/index',{products});
})
//Taking data from form
app.post('/products',async(req,res)=>{
    const newPatient=new patient(req.body);
    await newPatient.save();
    console.log(newPatient);
    res.redirect(`/patient/${newPatient._id}`)
})
//showing details of individual
app.get('/patient/:id',async(req,res)=>{
    const {id}=req.params;
    const pat= await patient.findById(id)
    console.log(pat);
    res.render('products/show',{pat});
})

app.listen(3000,()=>{
    console.log("Well Done PK");
})