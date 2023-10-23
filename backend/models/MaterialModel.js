const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const MaterialSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', 
        required: true,
      },
date: {
        type: Date,
        required: true,
      },
Material:[
  {  name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    baseRate:{
        type:Number,
        required:true
    }}
],
newMaterial:{
    type:Number,
    required:true
}

});

const Material =new mongoose.model('Material', MaterialSchema);

module.exports=Material