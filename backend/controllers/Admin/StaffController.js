const Staff = require("../../models/StaffModel");
const Staffattendance = require("../../models/StaffAttendance");
const cloudinary = require("../../Middleware/Cloudinary");
const mongoose = require('mongoose');


// This function handles Staff Adding to database, taking in a request (req) and a response (res) as parameters.

const handleStaffAdding = async (req, res) => {
  try {
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
      const StaffExist = await Staff.findOne({ adhar });

      if (StaffExist) {
        return res.json({
          success: false,
          message: "Staff already exists. Please check the staff List.",
        });
      }

      if (!req.files || !req.files.proof || !req.files.photo) {
        return res.json({
          success: false,
          message: "Both proof and photo must be uploaded.",
        });
      }

      const proofUpload = await cloudinary.uploader.upload(
        req.files.proof[0].path
      );
      const photoUpload = await cloudinary.uploader.upload(
        req.files.photo[0].path
      );

      if (!proofUpload.secure_url || !photoUpload.secure_url) {
        return res.json({
          success: false,
          message: "Failed to upload proof or photo",
        });
      }

      const newStaff = new Staff({
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

      await newStaff.save();

      return res
        .status(200)
        .json({ success: true, message: "staff added successfully." });
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

// This function handles Staff Details pic from data base, taking in a request (req) and a response (res) as parameters.

const handleStaffDetails = async (req, res) => {
  try {
    const allStaffData = await Staff.find();
   
    res.json({ allStaffData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ......................staff data using id .........................

const handleStaffById = async (req, res) => {
  try {
   
  const id=req.query.id
  const StaffData=await Staff.findById({_id:id})
  if(!StaffData){
    res.json({ success: false, messege: "cant find Staff details " });
  }
  res.json({StaffData})
} catch (error) {
  res.status(400).json({ error: error.message });
}
}


//  ...............................................staff attendance..............................................

const handleAttendanceofStaff=async(req,res)=>{
      
  try {
    // console.log(req.body);
    const { selectedValues } = req.body; 

    const date = new Date(); 
   
    let attendanceDocument = await Staffattendance.findOne({ date });

    if (!attendanceDocument) {
     
      attendanceDocument = new Staffattendance({ date, records: [] });
    }

    for (const StaffId in selectedValues) {
      const status = selectedValues[StaffId];
      
      const recordIndex = attendanceDocument.records.findIndex((record) =>
  record.StaffId && record.StaffId.equals(StaffId)
);

      if (recordIndex !== -1) {
       
        attendanceDocument.records[recordIndex].status = status;
      } else {
       
        attendanceDocument.records.push({ StaffId, status });
      }
    }

    await attendanceDocument.save();

    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  
}





//..........................attendance list ............................................................



const handleAttendanceListofStaff = async (req, res) => {
  try {
    const currentDate = new Date();

    const StaffAttendance = await Staffattendance.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0),
            $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0),
          }
        }
      }
    ]);

    if (StaffAttendance.length === 0) {

      res.json({ message: 'Attendance not found' });
      
    } else {

      console.log(StaffAttendance, 'attendanceDocuments');
      res.status(200).json({ message: 'Attendance retrieved successfully', StaffAttendance });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}



//  .........................................staff salary calculation .................................................

const salarycalculationofStaff=async(req,res)=>{
  try {
   
    const staffId = req.query.id
    //  console.log(staffId);
    const StaffData=await Staff.findById({_id:staffId})
    //  console.log(StaffData);
    if(!StaffData){
      return res.json({
        message: "Staff not found.",
      });
    }
    const attendanceRecords = await Staffattendance.find({ 'records.StaffId': staffId });
    // console.log(attendanceRecords);
    if(!attendanceRecords){
      return res.json({
        message: "Staff attendanceRecords not found.",
      });
    }
    const attendanceStats = {
      absent: 0,
      halfday: 0,
      present: 0,
    };
  
    attendanceRecords.forEach((record) => {
      record.records.forEach((attendanceRecord) => {
        if (attendanceRecord.StaffId.equals(staffId)) {
          attendanceStats[attendanceRecord.status]++;
        }
      });
    });
  const salary= (StaffData?.salary*attendanceStats?.present)+((StaffData?.salary*attendanceStats?.halfday)/2)

    const salaryData={
      present:attendanceStats?.present,
      halfday:attendanceStats?.halfday,
      absent:attendanceStats?.absent,
      salary:salary,
      basic:StaffData?.salary
    }
    res.status(200).json({ message: 'salary get successfully', salaryData });
  } catch (error) {
    console.error(error);
    throw error;
  }
  
}
  

module.exports = { handleStaffAdding, handleStaffDetails,handleStaffById,handleAttendanceofStaff,salarycalculationofStaff,handleAttendanceListofStaff }
