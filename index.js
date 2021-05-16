const express=require('express');
const app=express();
const passport=require('passport');
const passportLocal= require('../cureindia/config/passort');
const session=require('express-session');
const MongoStore=require('connect-mongodb-session')(session);
const path=require('path');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const patient = require('./models/patient');
const doctor = require('./models/doctor');

mongoose.connect('mongodb://localhost:27017/cureIndiaP');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('succesfully connected to database');
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
//session description
app.use(session({
    name:'CureIndia',
    secret:'bgbgbgbg',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
        },
        store:new MongoStore(
            //to keep signed in even on restarting the server
           {
               mongooseConnection:db,
               autoRemove:'disabled'
           },
           function(err){
               console.log(err||'connect-mongodb setup ok');
           }
    
        )
}));
app.use(passport.initialize());
app.use(passport.session());

//Styling
app.use(express.static('assests'));
app.use(passport.setAuthenticatedUser);

//Home page
app.get('/',(req,res)=>{
    res.render('products/home');
})
//New Entry patient
app.get('/products/new',(req,res)=>{
    res.render('products/new')
})
// //total data show
app.get('/products',async (req,res)=>{
    const products= await patient.find({});
    res.render('products/index',{products});
})
//Taking data from Patient
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
//New Entry for Doctor
app.get('/Doctor',async(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    return res.render('products/newdoct');
})
//Data from doctor's signup page
app.post('/doctorSignup',(req,res)=>{

    if(req.body.password!=req.body.cDpassword)
    {
        return res.redirect('/Doctor');
    }
    doctor.findOne({email:req.body.email}, function(err,user){
        if(err)
        {
            console.log("Error hai bhai");
            return ;
        }
        else
        if(!user)
        {
            const newdoct=new doctor(req.body);
             newdoct.save();
            return res.redirect('/signinDoctor');
        }
        else
        {
            console.log("User already exists");
            return res.redirect(`/Doctor`);
        }
    })
    // console.log(newdoct);
    // return res.redirect(`/Doctor`);
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
//Doctor Signin
app.get('/signinDoctor',(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    res.render('products/signind'); //profile
})
//Doctor signin data
app.post('/signinDoctor',passport.authenticate('local',{failureRedirect:'/signinDoctor'}),function(req,res){
    return res.redirect('/profileD');
})
app.get('/profileD',(req,res)=>{
    return res.render('products/doctorprofile');
})
//Patients Signin
app.get('/signinPatients',(req,res)=>{
    res.render('products/signinp');
})
app.get('/logout',(req,res)=>{
    req.logout();
    return res.redirect('/');
})
app.listen(3000,()=>{
    console.log("Connection established ab Again and again");
})