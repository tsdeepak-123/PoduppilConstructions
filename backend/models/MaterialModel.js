const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const MaterialSchema = new Schema({

name:{
    type:String,
    required:true
},
rate:{
    type:Number,
    required:true
}
});

const Material =new mongoose.model('Material', MaterialSchema);

module.exports=Material