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


// const salarycalculationoflabour = async (req, res) => {
//   try {
//     const { laborId } = req.query;
//     const { laborSalarydate } = req.query;
//     console.log(laborSalarydate,'laborSalarydate');

//     const LaborData = await Labour.findById({ _id: laborId });

//     if (!LaborData) {
//       return res.status(404).json({
//         message: "Labour not found.",
//       });
//     }

//     const endDate = new Date();
//     const startDate = new Date(LaborData.lastsalaryDate || LaborData.date);
//     console.log(startDate,endDate,'dates');

//     const attendanceRecords = await Attendance.find({
//       'records.laborerId': laborId,
//       'date': { $gte: startDate, $lte: endDate },
//     });

//     const month = new Date();
//     month.setDate(endDate.getDate() - 30);

//     const attendanceRecordbymonth = await Attendance.find({
//       'records.laborerId': laborId,
//       'date': { $gte: month, $lte: endDate },
//     });

//     const week = new Date();
//     week.setDate(endDate.getDate() - 7);

//     const attendanceRecordbyweek = await Attendance.find({
//       'records.laborerId': laborId,
//       'date': { $gte: week, $lte: endDate },
//     });

//     if (!attendanceRecords) {
//       return res.status(404).json({
//         message: "Labour attendance records not found for the specified period.",
//       });
//     }

//     const attendanceStatus = {
//       absent: 0,
//       halfday: 0,
//       present: 0,
//     };

//     attendanceRecords.forEach((record) => {
//       record.records.forEach((attendanceRecord) => {
//         if (attendanceRecord.laborerId.equals(laborId)) {
//           attendanceStatus[attendanceRecord.status]++;
//         }
//       });
//     });

//     const salary = (LaborData?.salary * attendanceStatus?.present) + ((LaborData?.salary * attendanceStatus?.halfday) / 2);

//     const monthlyattendanceStatus = {
//       absent: 0,
//       halfday: 0,
//       present: 0,
//     };

//     attendanceRecordbymonth.forEach((record) => {
//       record.records.forEach((attendanceRecord) => {
//         if (attendanceRecord.laborerId.equals(laborId)) {
//           monthlyattendanceStatus[attendanceRecord.status]++;
//         }
//       });
//     });

//     const monthlysalary = (LaborData?.salary * monthlyattendanceStatus?.present) + ((LaborData?.salary * monthlyattendanceStatus?.halfday) / 2);

//     const weeklyattendanceStatus = {
//       absent: 0,
//       halfday: 0,
//       present: 0,
//     };

//     attendanceRecordbyweek.forEach((record) => {
//       record.records.forEach((attendanceRecord) => {
//         if (attendanceRecord.laborerId.equals(laborId)) {
//           weeklyattendanceStatus[attendanceRecord.status]++;
//         }
//       });
//     });

//     const weeklysalary = (LaborData?.salary * weeklyattendanceStatus?.present) + ((LaborData?.salary * weeklyattendanceStatus?.halfday) / 2);

//     const SalaryData = await Salary.findOne({ laborerId: laborId });

//     if (SalaryData) {
//       console.log(attendanceStatus.present);
//       const newRecord = {
//         calculateFrom: startDate,
//         calculateTo: endDate,
//         present: attendanceStatus.present,
//         halfday: attendanceStatus.halfday,
//         absent: attendanceStatus.absent,
//         totalSalary: salary,
//         advance: LaborData.advance,
//         updatedSalary: salary - LaborData.advance,
//       };

//       SalaryData.records.addToSet(newRecord);
//       await SalaryData.save();

//     } else {
//       const salaryofLabour = new Salary({
//         laborerId: laborId,
//         records: [
//           {
//             calculateFrom: startDate,
//             calculateTo: endDate,
//             present: attendanceStatus.present,
//             halfday: attendanceStatus.halfday,
//             absent: attendanceStatus.absent,
//             totalSalary: salary,
//             advance: LaborData.advance,
//             updatedSalary: salary - LaborData.advance,
//           },
//         ],
//       });

//       await salaryofLabour.save();
//     }

//     const salaryDatas = await Salary.findOne({ laborerId: laborId }).populate('laborerId');
//     salaryDatas.records.sort((a, b) => b.calculateTo - a.calculateTo);
//     const latestRecord = salaryDatas.records[0];

//     const salaryData = {
//       LabourData:LaborData,
//       calculateFrom: latestRecord.calculateFrom,
//       calculateTo: latestRecord.calculateTo,
//       present: latestRecord?.present,
//       halfday: latestRecord?.halfday,
//       absent: latestRecord?.absent,
//       salary: latestRecord.totalSalary,
//       advance: latestRecord.advance,
//       updatedSalary: latestRecord.updatedSalary,
//       lastweek: weeklysalary,
//       lastmonth: monthlysalary,
//       basic: LaborData?.salary,
//       lastCalculatedAt: endDate,
//     };

//     await Labour.findByIdAndUpdate({ _id: LaborData._id }, { lastsalaryDate: latestRecord.calculateTo, advance: 0 });

//     res.status(200).json({ message: 'Salary calculated successfully', salaryData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred during salary calculation.' });
//   }
// };



const salarycalculationoflabour = async (req, res) => {
  try {
    const { laborId } = req.query;
   

    const LaborData = await Labour.findById({ _id: laborId });

    if (!LaborData) {
      return res.status(404).json({
        message: "Labour not found.",
      });
    }

   
    const salaryDatas = await Salary.findOne({ laborerId: laborId }).populate('laborerId');
    if (!salaryDatas) {
      return res.status(404).json({
        message: "salarydata not found.",
      });
    }


    salaryDatas.records.sort((a, b) => b.calculateTo - a.calculateTo);
    const latestRecord = salaryDatas.records[0];

    const salaryData = {
      LabourData:LaborData,
      calculateFrom: latestRecord.calculateFrom,
      calculateTo: latestRecord.calculateTo,
      present: latestRecord?.present,
      halfday: latestRecord?.halfday,
      absent: latestRecord?.absent,
      salary: latestRecord.totalSalary,
      advance: latestRecord.advance,
      updatedSalary: latestRecord.updatedSalary,
      basic: LaborData?.salary,
     
    };

   
    res.status(200).json({ message: 'Salarydata fetched successfully', salaryData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during salary calculation.' });
  }
};

//............................ salary calculation ..........................................


const salarycalculation = async (req, res) => {
  try {
   
    console.log(req.query);
    const { laborId } = req.query;
    const { laborSalarydate } = req.query;
   

    const LaborData = await Labour.findById({ _id: laborId });

    if (!LaborData) {
      return res.status(404).json({
        message: "Labour not found.",
      });
    }

    const endDate = new Date(laborSalarydate);
    const startDate = new Date(LaborData.lastsalaryDate || LaborData.date);
    console.log(startDate,endDate,'dates');

    const attendanceRecords = await Attendance.find({
      'records.laborerId': laborId,
      'date': { $gte: startDate, $lte: endDate },
    });

    

    

    if (!attendanceRecords) {
      return res.status(404).json({
        message: "Labour attendance records not found for the specified period.",
      });
    }

    const attendanceStatus = {
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

    const salary = (LaborData?.salary * attendanceStatus?.present) + ((LaborData?.salary * attendanceStatus?.halfday) / 2);

   
    const SalaryData = await Salary.findOne({ laborerId: laborId });

    if (SalaryData) {
      console.log(attendanceStatus.present);
      const newRecord = {
        calculateFrom: startDate,
        calculateTo: endDate,
        present: attendanceStatus.present,
        halfday: attendanceStatus.halfday,
        absent: attendanceStatus.absent,
        date:new Date(),
        totalSalary: salary,
        advance: LaborData.advance,
        updatedSalary: salary - LaborData.advance,
      };

      SalaryData.records.addToSet(newRecord);
      await SalaryData.save();

    } else {
      const salaryofLabour = new Salary({
        laborerId: laborId,
        records: [
          {
            calculateFrom: startDate,
            calculateTo: endDate,
            present: attendanceStatus.present,
            halfday: attendanceStatus.halfday,
            absent: attendanceStatus.absent,
            date:new Date(),
            totalSalary: salary,
            advance: LaborData.advance,
            updatedSalary: salary - LaborData.advance,
          },
        ],
      });

      await salaryofLabour.save();
    }

    const salaryDatas = await Salary.findOne({ laborerId: laborId }).populate('laborerId');
    salaryDatas.records.sort((a, b) => b.calculateTo - a.calculateTo);
    const latestRecord = salaryDatas.records[0];


    await Labour.findByIdAndUpdate({ _id: LaborData._id }, { lastsalaryDate: latestRecord.calculateTo, advance: 0 });

    res.status(200).json({ message: 'Salary calculated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during salary calculation.' });
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
      salarycalculation,
      labourAttendanceById
      
    
    }