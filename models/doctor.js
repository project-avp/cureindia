const mongoose=require('mongoose');
const doctSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fees:{
        type:Number
     //   required:true
    },
    specialisation:{
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
        type:String,
        required:true
    },
    rogi:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"patient"
        }
    ]
})
const doctor=mongoose.model('doctor',doctSchema);

module.exports=doctor;