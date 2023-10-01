const Labour=require('../../models/LabourModal')
const Attendance=require('../../models/Attendance')
const cloudinary = require('../../Middleware/Cloudinary')
const mongoose = require('mongoose');


// This fu  nction handles Labour Adding to database, taking in a request (req) and a response (res) as parameters.

const handleLabourAdding = async (req, res) => {
  try {

console.log(req.body);
    const {
      name,
      age,
      phone,
      street,
      post,
      town,
      district,
      state,
      pincode,
      salary,
      adhar,
      date,
    } = req.body;

    if (
      name &&
      phone &&
      street &&
      post &&
      town &&
      district &&
      state &&
      pincode &&
      salary &&
      date
    ) {
  
      const LabourExist = await Labour.findOne({ adhar });

      if (LabourExist) {
        return res.json({
          success: false,
          message: "Labour already exists. Please check the Labour List.",
        });
      }
      
      if (!req.files || !req.files.proof || !req.files.photo) {
        return res.json({
          success: false,
          message: "Both proof and photo must be uploaded.",
        });
      }
      

      const proofUpload = await cloudinary.uploader.upload(req.files.proof[0].path);
      const photoUpload = await cloudinary.uploader.upload(req.files.photo[0].path);

      if (!proofUpload.secure_url || !photoUpload.secure_url) {
        return res.json({
          success: false,
          message: "Failed to upload proof or photo",
        });
      }

      const newLabour = new Labour({
        name,
        age,
        phone,
        IdProof: proofUpload.secure_url,
        photo: photoUpload.secure_url,
        address: {
          street,
          post,
          town,
          district,
          state,
          pincode,
        },
        salary,
        adhar,
        date,
      });

      await newLabour.save();
  
      return res.status(200).json({ success: true, message: "Labour added successfully." });
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

    const handleLabourDetails=async (req,res)=>{
        try {
       
            const allLabourData=await Labour.find()
            
            res.json({allLabourData})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }


 

    // ......................Labour single view ......................................

    const handleLabourById=async (req,res)=>{
        try {
            const id=req.query.id
            const LabourData=await Labour.findById({_id:id})
            if(!LabourData){
              res.json({ success: false, messege: "cant find Labour details " });
            }
            res.json({LabourData})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }


    //............................................. labour attendance adding...........................................................



    const handleAttendance=async(req,res)=>{
      
    try {
     // console.log(req.body);
      const { selectedValues } = req.body; 
  
      const date = new Date(); 
     
      let attendanceDocument = await Attendance.findOne({ date });
  
      if (!attendanceDocument) {
       
        attendanceDocument = new Attendance({ date, records: [] });
      }
  
      for (const laborerId in selectedValues) {
        const status = selectedValues[laborerId];
        const recordIndex = attendanceDocument.records.findIndex((record) =>
          record.laborerId.equals(laborerId)
        );
  
        if (recordIndex !== -1) {
         
          attendanceDocument.records[recordIndex].status = status;
        } else {
         
          attendanceDocument.records.push({ laborerId, status });
        }
      }
  
     
      await attendanceDocument.save();

      //console.log(attendanceDocument,'attendanceDocument');
  
      res.status(200).json({ message: 'Attendance updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
    
  }

// .......................................calculate salary using attendance..................................................

// const salarycalculationoflabour=async(req,res)=>{


// try {
 
//    const laborId = req.query.id
//   // console.log(laborId);
//   const LabourData=await Labour.findById({_id:laborId})
//   // console.log(LabourData);
//   if(!LabourData){
//     return res.json({
//       message: "Labour not found.",
//     });
//   }
//   const attendanceRecords = await Attendance.find({ 'records.laborerId': laborId });
//   if(!attendanceRecords){
//     return res.json({
//       message: "Labour attendanceRecords not found.",
//     });
//   }
//   const attendanceStats = {
//     absent: 0,
//     halfday: 0,
//     present: 0,
//   };

//   attendanceRecords.forEach((record) => {
//     record.records.forEach((attendanceRecord) => {
//       if (attendanceRecord.laborerId.equals(laborId)) {
//         attendanceStats[attendanceRecord.status]++;
//       }
//     });
//   });
// const salary= (LabourData?.salary*attendanceStats?.present)+((LabourData?.salary*attendanceStats?.halfday)/2)
// // console.log(attendanceStats?.halfday);
// // console.log('salary',salary);
//   // console.log(attendanceStats);
//   const salaryData={
//     present:attendanceStats?.present,
//     halfday:attendanceStats?.halfday,
//     absent:attendanceStats?.absent,
//     salary:salary,
//     basic:LabourData?.salary
//   }
//   res.status(200).json({ message: 'salary get successfully', salaryData });
// } catch (error) {
//   console.error(error);
//   throw error;
// }
// }

const salarycalculationoflabour = async (req, res) => {
  try {
    // console.log(req.query);
    const { laborId, enddate } = req.query;
    const endDate = new Date(enddate);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);
console.log(endDate,startDate);
    const LabourData = await Labour.findById({ _id: laborId });
    if (!LabourData) {
      return res.json({
        message: "Labour not found.",
      });
    }
    
    const attendanceRecords = await Attendance.find({
      'records.laborerId': laborId,
      'date': { $gte: startDate, $lte: endDate },
    });
   

    if (!attendanceRecords) {
      return res.json({
        message: "Labour attendance records not found for the specified period.",
      });
    }

    const attendanceStats = {
      absent: 0,
      halfday: 0,
      present: 0,
    };

    attendanceRecords.forEach((record) => {
      record.records.forEach((attendanceRecord) => {
        if (attendanceRecord.laborerId.equals(laborId)) {
          attendanceStats[attendanceRecord.status]++;
        }
      });
    });

    const salary = (LabourData?.salary * attendanceStats?.present) + ((LabourData?.salary * attendanceStats?.halfday) / 2);

    const salaryData = {
      present: attendanceStats?.present,
      halfday: attendanceStats?.halfday,
      absent: attendanceStats?.absent,
      salary: salary,
      basic: LabourData?.salary,
    };

    res.status(200).json({ message: 'Salary calculated successfully', salaryData });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//.................................  attendance taking using id................................

const labourAttendanceById=async(req,res)=>{

  try {
    const labourId = req.query.labourId;
    const attendanceRecords = await Attendance.find({ 'records.laborerId': labourId });
  // console.log(attendanceRecords);
    const laborData = {};
    attendanceRecords.forEach((record) => {
      record.records.forEach((attendanceRecord) => {
        if (attendanceRecord.laborerId.equals(labourId)) {
          const date = record.date.toISOString().split('T')[0]; 
          const status = attendanceRecord.status;
          // console.log(date,'date',status,'status');
          laborData[date] = status;
        }
      });
    });
    res.status(200).json({laborData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


    module.exports={handleLabourAdding,
      handleLabourDetails,
      handleLabourById,
      handleAttendance,
      salarycalculationoflabour,
      labourAttendanceById
      
    
    }