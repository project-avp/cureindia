const mongoose=require('mongoose');
const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String
    }
})
const patient=mongoose.model('patient',patientSchema);

module.exports=patient;