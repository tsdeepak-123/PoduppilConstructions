const Project=require('../../models/ProjectModel')
const contract=require('../../models/ContractModel')
const cloudinary = require('../../Middleware/Cloudinary')
const mongoose = require('mongoose');



//  .............................. add new  Contract....................................................


const handleAddContract = async (req, res) => {
    try {console.log('contract came');
    
      const  {
        projectname,projectnumber,Contractwork,totallabour,Contractorname,
        totalhelper,Details,phone,date,Paymentdetails,status,Amount} =req.body;
  
      if ( projectname&&projectnumber&&Contractwork&&totallabour&&Contractorname&&
        totalhelper&&Details&&phone&&date&&Paymentdetails&&status&&Amount
      ) {
        const FindProject = await Project.findOne({name:projectname,projectnumber:projectnumber})
        console.log(FindProject);
        if(!FindProject){
            res.json({ success: false, messege: "cant find project based on project name and number enter proper number and name of the project " });
        }
        // const ContractExist = await contract.findOne({ projectnumber });
        // if (ContractExist) {
        //   res.json({
        //     success: false,
        //     messege: "contrat already exist.Please check project List",
        //   }); 
        // }
        
        else {
            console.log(req.body);
          const newContract = new contract({
            project:FindProject._id,Contractwork,totallabour,Contractorname,
        totalhelper,Details,phone,date,Paymentdetails,status,Amount
          });
         
          await newContract.save();
          res.status(200).json({ success: true, messege: "Project added successfully" });
        }
      } else {
        res.json({ success: false, messege: "All fields must be field " });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

//   ................................... listing all contract details..................................

const ContractList =async(req,res)=>{
    try {
        const FindContract = await contract.find().populate('project')
        console.log(FindContract);
        if(!FindContract){
            res.json({ success: false, messege: "cant find contract details " });
        }
        res.status(200).json({FindContract, success: true });
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
}

//...................contractList single view based on id ........................

const ContractListById =async(req,res)=>{
    try {
        const id=req.query.id
        const FindContract = await contract.findOne({_id:id}).populate('project')
        console.log(FindContract);
        if(!FindContract){
            res.json({ success: false, messege: "cant find contract details " });
        }
        res.status(200).json({FindContract, success: true });
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
}
  
  
  
  
  module.exports={
    handleAddContract,ContractList,ContractListById
  }