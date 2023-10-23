const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const MaterialSchema = new Schema({
project:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Project"
},
Materials:[{
    name:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true
    },
    quantiy:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
}],

BillTotal:{
    type:Number,
}
 
},{timestamps:true});

const Purchase =new mongoose.model('Purchase', MaterialSchema);

module.exports=Purchase