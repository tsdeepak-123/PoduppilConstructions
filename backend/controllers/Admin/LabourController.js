const Labour=require('../../models/LabourModal')
const Attendance=require('../../models/Attendance')
const Salary=require('../../models/SalaryModel')
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
//   const attendanceStatus = {
//     absent: 0,
//     halfday: 0,
//     present: 0,
//   };

//   attendanceRecords.forEach((record) => {
//     record.records.forEach((attendanceRecord) => {
//       if (attendanceRecord.laborerId.equals(laborId)) {
//         attendanceStatus[attendanceRecord.status]++;
//       }
//     });
//   });
// const salary= (LabourData?.salary*attendanceStatus?.present)+((LabourData?.salary*attendanceStatus?.halfday)/2)
// // console.log(attendanceStatus?.halfday);
// // console.log('salary',salary);
//   // console.log(attendanceStatus);
//   const salaryData={
//     present:attendanceStatus?.present,
//     halfday:attendanceStatus?.halfday,
//     absent:attendanceStatus?.absent,
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
    const { laborId } = req.query;
    const { laborSalarydate } = req.query;
    // console.log(laborSalarydate);
    const LabourData=await Labour.findById({_id:laborId})
    if (!LabourData) {
      return res.json({
        message: "Labour not found.",
      });
    }
    
    const endDate = new Date(laborSalarydate);
    
    console.log(LabourData.lastsalaryDate,'LabourData.lastsalaryDate');
    console.log(LabourData.date,'LabourData.date');
    const startDate = new Date(LabourData.lastsalaryDate??LabourData.date);
   
console.log(endDate,startDate);
   
    
    const attendanceRecords = await Attendance.find({
      'records.laborerId': laborId,
      'date': { $gte: startDate, $lte: endDate },
    });
    const month=new Date()
    month.setDate(endDate.getDate() -30)
    
    console.log(month);
    const attendanceRecordbymonth = await Attendance.find({
      'records.laborerId': laborId,
      'date': { $gte: month, $lte: endDate },
    });
    const week=new Date()
    week.setDate(endDate.getDate() -7)
    const attendanceRecordbyweek = await Attendance.find({
      'records.laborerId': laborId,
      'date': { $gte: week, $lte: endDate },
    });
   

    if (!attendanceRecords) {
      return res.json({
        message: "Labour attendance records not found for the specified period.",
      });
    }

    const attendanceStatus = {
      absent: 0,
      halfday: 0,
      present: 0,
    };
    const weeklyattendanceStatus = {
      absent: 0,
      halfday: 0,
      present: 0,
    };
    const monthlyattendanceStatus = {
      absent: 0,
      halfday: 0,
      present: 0,
    };

    attendanceRecords.forEach((record) => {
      record.records.forEach((attendanceRecord) => {
        if (attendanceRecord.laborerId.equals(laborId)) {
          attendanceStatus[attendanceRecord.status]++;
        }
      });
    });

    const salary = (LabourData?.salary * attendanceStatus?.present) + ((LabourData?.salary * attendanceStatus?.halfday) / 2);

//  .....monthly calculation start

    attendanceRecordbymonth.forEach((record) => {
      record.records.forEach((attendanceRecord) => {
        if (attendanceRecord.laborerId.equals(laborId)) {
          monthlyattendanceStatus[attendanceRecord.status]++;
        }
      });
    });

    const monthlysalary = (LabourData?.salary * monthlyattendanceStatus?.present) + ((LabourData?.salary * monthlyattendanceStatus?.halfday) / 2);
  
  //  .....monthly calculation end
    //  .....weekly calculation  start....
    attendanceRecordbyweek.forEach((record) => {
      record.records.forEach((attendanceRecord) => {
        if (attendanceRecord.laborerId.equals(laborId)) {
          weeklyattendanceStatus[attendanceRecord.status]++;
        }
      });
    });

    const weeklysalary = (LabourData?.salary * weeklyattendanceStatus?.present) + ((LabourData?.salary * weeklyattendanceStatus?.halfday) / 2);
//  .....weekly calculation end

    // const salaryData = {
    //   LabourData, 
    //   present: attendanceStats?.present,
    //   halfday:attendanceStats?.present,
    //   absent: attendanceStats?.absent,
    //   salary: salary,
    //   lastweek: weeklysalary,
    //   lastmonth:monthlysalary ,
    //   basic: LabourData?.salary,
    //   lastCalculatedAt:endDate
    // };

    const SalaryData = await Salary.findOne({ laborerId: laborId })
    
    if (SalaryData) {
      // console.log('Salary data is there', SalaryData);
    
      const newRecord = {
        calculateFrom: startDate,
        calculateTo: endDate,
        present: attendanceStats?.present,
        halfday: attendanceStats?.halfday,
        absent: attendanceStats?.absent,
        totalSalary: salary,
        advance: LabourData.advance,
        updatedSalary: salary - LabourData.advance,
      };
    
      SalaryData.records.addToSet(newRecord);
      await SalaryData.save();

    } else {
      // console.log('Salary data is not there');
    
     
      const salaryofLabour = new Salary({
        laborerId: laborId,
        records: [
          {
            calculateFrom: startDate,
            calculateTo: endDate,
            present: attendanceStats?.present,
            halfday: attendanceStats?.halfday,
            absent: attendanceStats?.absent,
            totalSalary: salary,
            advance: LabourData.advance,
            updatedSalary: salary - LabourData.advance,
          },
        ],
      });
    
      await salaryofLabour.save();

      console.log(salaryofLabour, 'salaryLabour....');
    }
    const salaryDatas = await Salary.findOne({ laborerId: laborId }).populate('laborerId')
    console.log(salaryDatas);
    salaryDatas.records.sort((a, b) => b.calculateTo - a.calculateTo);

    
    const latestRecord = salaryDatas.records[0];
  
    console.log('Latest SalaryData Record:', latestRecord);

    const salaryData = {
      LabourData, 
<<<<<<< HEAD
      calculateFrom:latestRecord.calculateFrom ,
      calculateTo:latestRecord.calculateTo ,
      present: latestRecord?.present,
      halfday:latestRecord?.present,
      absent: latestRecord?.absent,
      salary: latestRecord.totalSalary,
      advance:latestRecord.advance,
      updatedSalary:latestRecord. updatedSalary,
=======
      present: attendanceStatus?.present,
      halfday: attendanceStatus?.halfday,
      absent: attendanceStatus?.absent,
      salary: salary,
>>>>>>> ac13396a210957443820860998485e903ffd6066
      lastweek: weeklysalary,
      lastmonth:monthlysalary ,
      basic: LabourData?.salary,
      lastCalculatedAt:endDate
    }
    console.log(salaryData,'sddd');
    const l=await Labour.findByIdAndUpdate({ _id: LabourData._id },{lastsalaryDate: latestRecord.calculateTo,advance: 0 });
    console.log(l);

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