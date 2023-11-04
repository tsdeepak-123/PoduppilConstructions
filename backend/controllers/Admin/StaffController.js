const Staff = require("../../models/StaffModel");
const Staffattendance = require("../../models/StaffAttendance");

const StaffSalary = require("../../models/StaffSalaryModel");
const cloudinary = require("../../Middleware/Cloudinary");
const moment= require('moment')

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

      const proofUrls = [];
      for (const proof of req.files.proof) {
        console.log(proof, 'proof');
        const proofUpload = await cloudinary.uploader.upload(proof.path);
        if (!proofUpload.secure_url) { 
          return res.json({
            success: false,
            message: "Failed to upload proof or photo",
          });
        }
        proofUrls.push(proofUpload.secure_url)
      }

      // const proofUpload = await cloudinary.uploader.upload(
      //   req.files.proof[0].path
      // );
      const photoUpload = await cloudinary.uploader.upload(
        req.files.photo[0].path
      );

      if (!photoUpload.secure_url) {
        return res.json({
          success: false,
          message: "Failed to upload proof or photo",
        });
      }

      const newStaff = new Staff({
        name,
        age,
        phone,
        IdProof: proofUrls,
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
    const id = req.query.id;
    const StaffData = await Staff.findById({ _id: id });
    if (!StaffData) {
      res.json({ success: false, message: "cant find Staff details " });
    }
    res.json({ StaffData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  ...............................................staff attendance..............................................

const handleAttendanceofStaff = async (req, res) => {
  try {
    // console.log(req.body);
    const { selectedValues } = req.body;

    const currentDate = moment();
    const formattedDate = currentDate.format("YYYY-MM-DD");

    let attendanceDocument = await Staffattendance.findOne({ date:formattedDate });

    if (!attendanceDocument) {
      attendanceDocument = new Staffattendance({ date:formattedDate, records: [] });
    }

    for (const StaffId in selectedValues) {
      const status = selectedValues[StaffId];

      const recordIndex = attendanceDocument.records.findIndex(
        (record) => record.StaffId && record.StaffId.equals(StaffId)
      );

      if (recordIndex !== -1) {
        attendanceDocument.records[recordIndex].status = status;
      } else {
        attendanceDocument.records.push({ StaffId, status });
      }
    }

    await attendanceDocument.save();

    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//..........................attendance list ............................................................

const handleAttendanceListofStaff = async (req, res) => {
  try {
    const currentDate = moment();
    const formattedDate = currentDate.format("YYYY-MM-DD");

    const StaffAttendance = await Staffattendance.find({date:formattedDate})

    if (StaffAttendance.length === 0) {
      res.json({ message: "Attendance not found" });
    } else {

 const promises = StaffAttendance.map((attendanceDocument) =>
      Promise.all(
        attendanceDocument.records.map(async (record) => {
        
          const staffData = await Staff.findById({ _id:record.StaffId});
       record.StaffId = staffData;
          
        })
      )
    );
    await Promise.all(promises);
      // console.log(StaffAttendance, 'attendanceDocuments');
      res.status(200).json({ message: 'Attendance retrieved successfully', StaffAttendance });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  .........................................staff salary calculation .................................................



const salarycalculationofStaff = async (req, res) => {
  try {
    // console.log('cameeeee');
    const  {staffId}  = req.query
  //  console.log(staffId);
   
    const StaffData = await Staff.findById({ _id: staffId });

    // console.log(StaffData,'StaffData');

    if (!StaffData) {
      return res.status(404).json({
        message: "StaffData not found.",
      });
    }

    const endDate = new Date();
        const startDate = new Date(StaffData.lastsalaryDate || StaffData.date);
        // console.log(startDate,endDate,'dates');

      
        const attendanceRecords = await Staffattendance.find({
          'records.StaffId': staffId,
          'date': { $gte: startDate, $lte: endDate },
        });
       
        

// console.log(attendanceRecords,'attendanceRecords');
      if (!attendanceRecords) {
      return res.status(404).json({
        message: "staff attendance records not found for the specified period.",
      });
    }
   
      const attendanceStatus = {
      absent: 0,
      halfday: 0,
      present: 0,
    };

    attendanceRecords.forEach((record) => {
      record.records.forEach((attendanceRecord) => {
        if (attendanceRecord.StaffId.equals(staffId)) {
          attendanceStatus[attendanceRecord.status]++;
        }
      });
    });
    // console.log(attendanceStatus);
    // const salaryDatas = await StaffSalary.findOne({ StaffId: staffId }).populate('StaffId');
    // if (!salaryDatas) {
     
      const salary = StaffData?.salary * attendanceStatus?.present+ (StaffData?.salary * attendanceStatus?.halfday) / 2;

      // console.log('datasss',attendanceStatus);
      const salaryData={ StaffData:StaffData,
        present:attendanceStatus?.present?? 0,
        halfday: attendanceStatus?.halfday??0,
        absent: attendanceStatus?.absent??0,
        advance: StaffData.advance,
        lastweek:salary,
        balance:salary-StaffData.advance
      }
      // console.log(salaryData,'salarydata !sdatas');
      return res.json({salaryData,
        message: "salarydata not found.",
      });
    // }


    // salaryDatas.records.sort((a, b) => b.calculateTo - a.calculateTo);
    // const latestRecord = salaryDatas.records[0];
    // console.log(latestRecord,'salarydata');
   
    // const salaryData = {
    //   StaffData:StaffData,
    //   calculateFrom: latestRecord.calculateFrom,
    //   calculateTo: latestRecord.calculateTo,
    //   present: latestRecord?.present??0,
    //   halfday: latestRecord?.halfday??0,
    //   absent: latestRecord?.absent??0,
    //   salary: latestRecord.totalSalary,
    //   advance: latestRecord.advance,
    //   updatedSalary: latestRecord.updatedSalary,
    //   basic: StaffData?.salary,
      
     
    // };

   
    // res.status(200).json({ message: 'Salarydata fetched successfully', salaryData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during salary calculation.' });
  }
};



//............................ salary calculation ..........................................


const salarycalculationforStaff = async (req, res) => {
  try {
    // console.log('logggggggggggggggggggggggggggg');
   
    // console.log(req.query);
    const  {staffId}  = req.query
    const { staffSalarydate } = req.query;
   

    const StaffData = await Staff.findById({ _id: staffId });
    // console.log(StaffData,'staffData');

    if (!StaffData) {
      return res.status(404).json({
        message: "staff not found.",
      });
    }

    const endDate = new Date(staffSalarydate);
    const startDate = new Date(StaffData.lastsalaryDate || StaffData.date);
    const today=new Date()
    // console.log(startDate,endDate,'dates......');

    const startdatePart = startDate.toISOString().slice(0, 10);
    const enddatePart = endDate.toISOString().slice(0, 10);
    const todayPart = today.toISOString().slice(0, 10);


    // console.log(enddatePart==startdatePart,'datesequel....');

    if(todayPart == enddatePart){
      endDate.setDate(endDate.getDate() + 1)
// console.log('eque',endDate);   

    }

    const attendanceRecords = await Staffattendance.find({
      'records.StaffId': staffId,
      'date': { $gte: startDate, $lte: endDate },
    });
   
// console.log(attendanceRecords,'attendanceRecords');
    if (!attendanceRecords) {
      return res.status(404).json({
        message: "staff attendance records not found for the specified period.",
      });
    }

    const attendanceStatus = {
      absent: 0,
      halfday: 0,
      present: 0,
    };

    attendanceRecords.forEach((record) => {
      record.records.forEach((attendanceRecord) => {
        if (attendanceRecord.StaffId.equals(staffId)) {
          attendanceStatus[attendanceRecord.status]++;
        }
      });
    });

// console.log(attendanceStatus,'attendanceStatus');

    if(todayPart == enddatePart){
      endDate.setDate(endDate.getDate() -1)
// console.log('minus',endDate);

    }
    const salary = (StaffData?.salary * attendanceStatus?.present) + ((StaffData?.salary * attendanceStatus?.halfday) / 2);

  //  console.log(salary,'salary');

    const SalaryData = await StaffSalary.findOne({ StaffId: staffId });
    // console.log(SalaryData,'SalaryData');

    if (SalaryData) {
      // console.log(attendanceStatus.present);
      const newRecord = {
        calculateFrom: startDate,
        calculateTo: endDate,
        present: attendanceStatus.present,
        halfday: attendanceStatus.halfday,
        absent: attendanceStatus.absent,
        date:new Date(),
        totalSalary: salary,
        advance: StaffData.advance,
        updatedSalary: salary - StaffData.advance,
      };

// console.log(SalaryData,'SalaryData');

      SalaryData.records.addToSet(newRecord);
      await SalaryData.save();

    } else {

      // console.log('new here  ');

      const salaryofStaff = new StaffSalary({
        StaffId: staffId,
        records: [
          {
            calculateFrom: startDate,
            calculateTo: endDate,
            present: attendanceStatus.present??0,
            halfday: attendanceStatus.halfday??0,
            absent: attendanceStatus.absent??0,
            date:new Date(),
            totalSalary: salary,
            advance: StaffData.advance,
            updatedSalary: salary - StaffData.advance,
          },
        ],
      });

      await salaryofStaff.save();

      
    if( salary > StaffData.advance){

      await Staff.findByIdAndUpdate({  _id: StaffData._id  }, { advance: 0 });
    }else{
      await Staff.findByIdAndUpdate({  _id: StaffData._id  },{ advance: StaffData.advance-salary});

    }

    }

    const salaryDatas = await StaffSalary.findOne({ StaffId: staffId }).populate('StaffId');
    // console.log(salaryDatas,'salaryDatas');

    salaryDatas.records.sort((a, b) => b.calculateTo - a.calculateTo);
    const latestRecord = salaryDatas.records[0];


    await Staff.findByIdAndUpdate({ _id: StaffData._id }, { lastsalaryDate: latestRecord.calculateTo});

    res.status(200).json({ message: 'Salary calculated successfully' });
  
 } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during salary calculation.' });
  }
};


// giving advance to staff----------------------------------------------------------------------------

const handleStaffAdvance=async(req,res)=>{
  try {
    const id = req.query.id;
    const {advance}=req.body;
    const staffData = await Staff.findById({ _id: id });
      if(!staffData){
        res.json({message:"No staff found"})
      }
     const updatedAdvance=staffData.advance + parseFloat(advance)
    //  console.log(updatedAdvance);
       await Staff.updateOne({_id:id},{$set:{advance:updatedAdvance}})
       res.json({ message: "Advance updated successfully" });
  } catch (error) {
    console.error("Error updating advance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//..................... staff attendance edit ......................................................




const stafffAttendanceEdit = async (req, res) => {

  try {
    // console.log('came', req.body);
    
    const {staffId, status } = req.body;

    const currentDate = new Date();
    const startOfDay = new Date(currentDate);

    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(currentDate);

    endOfDay.setHours(23, 59, 59, 999);

    const attendanceRecords = await Staffattendance.find({
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    // console.log(attendanceRecords);

    attendanceRecords.forEach(async (record) => {
      const matchingRecord = record.records.find((r) => r.StaffId == staffId);

      if (matchingRecord) {
        matchingRecord.status = status;
      } else {
        // console.log('came');

          record.records.push({ StaffId:staffId, status });
        
      }
    });

    const updatedRecords = await Promise.all(
      attendanceRecords.map((record) => record.save())
      );

      // console.log(updatedRecords);

    res.status(200).json({message: "successfull", updatedRecords });

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//...........................  salary history of all labour ...............................

const handleAllStaffHIstory = async (req, res) => {
  try {
    // const {labourId} = req.query;
    // const {advance}=req.body;
    const StaffSalaryData = await StaffSalary.find().populate('StaffId');
    
    if (!StaffSalaryData) {
      res.json({ message: "No staff found" });
    }

    const updatedStaffSalaryData = StaffSalaryData.map((staff) => {
      if (staff.records.length > 0) {
        const sortedRecords = staff.records.sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        );
        const latestRecord = sortedRecords[0];
        staff.records = [latestRecord];
      }
      return staff;
    }); // Closing parenthesis should be here

    res.status(200).json({ message: "successfull", updatedStaffSalaryData });
  } catch (error) {
    console.error("Error updating advance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//-----------------------------------------------

const StaffAttendanceById=async(req,res)=>{

  try {
    const staffId = req.query.staffId;
    const attendanceRecords = await Staffattendance.find({ 'records.StaffId': staffId });
  console.log(attendanceRecords,"records");
    const staffData = {};
    attendanceRecords.forEach((record) => {
      record.records.forEach((attendanceRecord) => {
        if (attendanceRecord.StaffId.equals(staffId)) {
          const date = record.date.toISOString().split('T')[0]; 
          const status = attendanceRecord.status;
          // console.log(date,'date',status,'status');
          staffData[date] = status;
        }
      });
    });
    res.status(200).json({staffData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




module.exports = {
  handleStaffAdding,
  handleStaffDetails,
  handleStaffById,
  handleAttendanceofStaff,
  salarycalculationofStaff,
  salarycalculationforStaff,
  handleAttendanceListofStaff,
  handleStaffAdvance,
  stafffAttendanceEdit,
  handleAllStaffHIstory,
  StaffAttendanceById
};
