const mongoose=require('mongoose');

const paymentSchema= new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    paidAt:{
     type:Date,
     required:true,
    },

    paymentId:{
        type:String,
        required:true,
    },
    amount:{
      type:Number,
      required:true
    },
    method:{
        type:String,
    },
    paymentMonth:{
        type:String,
        required:true,
        unique:true,
    }

});

module.exports=mongoose.model("payment",paymentSchema);