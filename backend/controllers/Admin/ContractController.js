const Project=require('../../models/ProjectModel')
const contract=require('../../models/ContractModel')
const cloudinary = require('../../Middleware/Cloudinary')
const mongoose = require('mongoose');



//  .............................. add new  Contract....................................................


const handleAddContract = async (req, res) => {
    try {
      console.log(req.body,'contract came');
    
      const  {
        projectname,Contractwork,totallabour,Contractorname,
        totalhelper,Details,phone,date,Paymentdetails,status,Amount} =req.body;
  
      if ( projectname&&Contractwork&&totallabour&&Contractorname&&
        totalhelper&&Details&&phone&&date&&Paymentdetails&&status&&Amount
      ) {
        const FindProject = await Project.findOne({name:projectname})
        console.log(FindProject);
        if(!FindProject){
            res.json({ success: false, messege: "cant find project based on project name and number enter proper number and name of the project " });
        }
       
        
        else {
            console.log(req.body);
          const newContract = new contract({
            project:FindProject._id,projectname,Contractwork,totallabour,Contractorname,
        totalhelper,Details,phone,date,Paymentdetails,status,Amount
          });
         
          console.log(newContract,"new contracttt");
          await newContract.save();
          res.status(200).json({ success: true, messege: "Project added successfully" });
        }
      } else {
        res.json({ success: false, messege: "All fields must be field " });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

//   ................................... listing all contract details..................................

const ContractList =async(req,res)=>{
    try {
      
        const FindContract = await contract.find({isCompleted:req.query.status}).populate('project')
        console.log(FindContract);
        if(!FindContract){
            res.json({ success: false, messege: "cant find contract details " });
        }
        res.status(200).json({FindContract, success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
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
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


//..........................Contract edit ..........................................



const handleEditContract = async (req, res) => {
  try {
    const id=req.query.id
    const {
      projectname,
      Contractwork,
      totallabour,
      Contractorname,
      totalhelper,
      Details,
      phone,
      date,
      Paymentdetails,
      status,
      Amount,
    } = req.body;

    const updateFields = {};

    if (projectname) {
      const FindProject = await Project.findOne({ name: projectname });
      console.log(FindProject, 'FindProject');

      if (FindProject) {
        updateFields.project = FindProject._id;
        updateFields.projectname = FindProject.name;
      } else {
        return res.status(404).json({ message: "Can't find project details" });
      }
    }

    if (Contractwork) updateFields.Contractwork = Contractwork;
    if (totallabour) updateFields.totallabour = totallabour;
    if (Contractorname) updateFields.Contractorname = Contractorname;
    if (totalhelper) updateFields.totalhelper = totalhelper;
    if (Details) updateFields.Details = Details;
    if (phone) updateFields.phone = phone;
    if (date) updateFields.date = date;
    if (Paymentdetails) updateFields.Paymentdetails = Paymentdetails;
    if (status) updateFields.status = status;
    if (Amount) updateFields.Amount = Amount;

    const Findcontract = await contract.findById(id);
    console.log(Findcontract, 'Findcontract');

    if (!Findcontract) {
      return res.status(404).json({ success: false, message: "Can't find contract details" });
    } else {
      Object.assign(Findcontract, updateFields);

      const savedContract = await Findcontract.save();
      console.log(savedContract, 'savedContract');

      res.status(200).json({ message: "Edited successfully", contract: savedContract });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const handleCompletedContracts=async(req,res)=>{
  try {
    const id= req.query.id
    await contract.findByIdAndUpdate({_id:id},{$set:{isCompleted:true}})
    res.json({success:true,messege:"Project status updated successfully"})
  } catch (error) {
    console.log(error);
  }
}
  
  
  module.exports={
    handleAddContract,ContractList,ContractListById,handleEditContract,handleCompletedContracts
  }