const Bill=require("../../models/BillModel")
const cloudinary = require('../../Middleware/Cloudinary')



// This function handles bill Adding to database, taking in a request (req) and a response (res) as parameters.

const handleBillAdding = async (req, res) => {
    try {
  console.log("hiiiiiiiiiiiiiiiiiiii");
  console.log(req.body)
  console.log(req.files.photo,"photoooooooo");
//   console.log(req.body);
      const {
        name,
        date,
        amount,
        status,
        paid,
        pending,
        paidby,
        payment,
      } = req.body;
  
      if (
        name &&
        date&&
        amount&&
        status&&
        paid&&
        pending&&
        paidby&&
        payment
      ) {
         
        console.log("clearrrrrrrrrrrrrr")
        const BillExist = await Bill.findOne({name});
  
        if (BillExist) {
          return res.json({
            success: false,
            message: "Bill already exists. Please check the Bill List.",
          });
        }
        
        if (!req.files|| !req.files.photo) {
          return res.json({
            success: false,
            message: "photo must be uploaded.",
          });
        }
        console.log(req.files.photo[0].path,"photo pathhhhhhhhhhhhhhhhhhhhhhhhhhh");
        const photoUpload = await cloudinary.uploader.upload(req.files.photo[0].path);
    console.log(photoUpload.secure_url,"urllllllllll");
        if (!photoUpload.secure_url) {
          return res.json({
            success: false,
            message: "Failed to upload photo",
          });
        }
  
        const newBill = new Bill({
            name,
            date,
            amount,
            status,
            paid,
            pending,
            paidby,
            payment,
            photo: photoUpload.secure_url
       
        });
  
        await newBill.save()
        console.log("Bill added successfully.");
        return res.status(200).json({ success: true, message: "Bill added successfully." });
      } else {
        return res.json({
          success: false,
          message: "All fields must be filled.",
        });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  // This function handles Labour Details pic from data base, taking in a request (req) and a response (res) as parameters.

  const handleBillDetails=async (req,res)=>{
    try {
   
        const allBillData=await Bill.find()
        
        res.json({allBillData})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


  module.exports={handleBillAdding,handleBillDetails}