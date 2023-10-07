const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const BillSchema = new Schema({
  name: { type: String },
  amount:{type:String},
  status:{type:String},
  paid:{type:Number},
  pending:{type:Number},
  paidby:{type:String},
  payment:{type:String},
  date: { type: Date },
  image: { type: String },
});

const Bill =new mongoose.model('Bill', BillSchema);

module.exports=Bill

