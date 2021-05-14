const mongoose=require('mongoose');
const doctSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
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
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    rogi:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"rogi"
        }
    ]
})
const doctor=mongoose.model('doctor',doctSchema);

module.exports=doctor;