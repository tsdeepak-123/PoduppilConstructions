const express = require("express");
const adminRoute = express();
const {
  handleSignIn,
  handleSignUp,
} = require("../controllers/Admin/AdminController");
const {
  handleLabourAdding,
  handleLabourDetails,
  handleAttendance,
  salarycalculationoflabour,
  handleLabourById,
  labourAttendanceById,
  salarycalculation,
  handleAttendanceList,
  handleLabourAdvance,
  handleLabourHIstory,
  labourAttendanceEdit,
  handleAllLabourHIstory,
} = require("../controllers/Admin/LabourController");
const {
  handleStaffAdding,
  handleStaffDetails,
  handleAttendanceofStaff,
  salarycalculationofStaff,
  handleStaffById,
  handleAttendanceListofStaff,
  handleStaffAdvance,
  salarycalculationforStaff,
  stafffAttendanceEdit,
  handleAllStaffHIstory,
} = require("../controllers/Admin/StaffController");
const {
  handleProjectAdding,
  handleProjectEditing,
  ProjectList,
  ProjectListById,
  handlePhotoAdding,
  handleCompletedProjects,
} = require("../controllers/Admin/ProjectController");
const {
  handleAddContract,
  ContractList,
  ContractListById,
  handleEditContract,
} = require("../controllers/Admin/ContractController");
// const{handleLabourAdding,handleLabourHIstory,handleLabourDetails,handleAllLabourHIstory,labourAttendanceEdit,handleAttendance,salarycalculationoflabour,handleLabourById,labourAttendanceById,salarycalculation,handleAttendanceList,handleLabourAdvance}=require('../controllers/Admin/LabourController')
// const{handleStaffAdding,stafffAttendanceEdit,handleAllStaffHIstory,handleStaffDetails,handleAttendanceofStaff,salarycalculationofStaff,handleStaffById,handleAttendanceListofStaff,handleStaffAdvance,salarycalculationforStaff}=require('../controllers/Admin/StaffController')
// const{handleProjectAdding,handleProjectEditing,ProjectList,ProjectListById}=require('../controllers/Admin/ProjectController')
// const{handleAddContract,ContractList,ContractListById,handleEditContract}=require('../controllers/Admin/ContractController')
const {
  handleBillAdding,
  handleBillDetails,
} = require("../controllers/Admin/BillController");
const upload = require("../Middleware/Multer");
const Auth = require("../Middleware/Auth");
const { handleMaterialAdding, handleMaterialList, handleMaterialPurchase, handleMaterialTotal,handlePurchaseById,handlePurchaseByDate } = require("../controllers/Admin/MaterialController");

//The routes for admin authentication

adminRoute.post("/login", handleSignIn);
adminRoute.post("/signup", handleSignUp);
adminRoute.post(
  "/addlabour",
  upload.fields([
    { name: "proof", maxCount: 2 },
    { name: "photo", maxCount: 1 },
  ]),
  handleLabourAdding
);
adminRoute.get("/labourslist", handleLabourDetails);
adminRoute.get("/labourbyid", handleLabourById);
adminRoute.post(
  "/addstaff",
  upload.fields([
    { name: "proof", maxCount: 2 },
    { name: "photo", maxCount: 1 },
  ]),
  handleStaffAdding
);
adminRoute.get("/staffslist", handleStaffDetails);
adminRoute.get("/staffByid", handleStaffById);
adminRoute.post("/labourattendance", handleAttendance);
adminRoute.get("/labourattendancelist", handleAttendanceList);
adminRoute.post("/staffattendance", handleAttendanceofStaff);
//.......attendancelist
adminRoute.get("/staffattendanceList", handleAttendanceListofStaff);
adminRoute.get("/salarycalculation", salarycalculationoflabour);
adminRoute.post("/salaryoflabour", salarycalculation);
adminRoute.post("/salaryofStaff", salarycalculationforStaff);
adminRoute.get("/staffsalary", salarycalculationofStaff);
adminRoute.post("/addproject", handleProjectAdding);
adminRoute.patch("/editproject/:id", handleProjectEditing); //my edits
adminRoute.post("/AddContract", handleAddContract);
adminRoute.get("/ContractList", ContractList);
adminRoute.get("/ContractById", ContractListById);
adminRoute.get("/projectList", ProjectList);
adminRoute.get("/projectById", ProjectListById);
adminRoute.get("/labourattendanceById", labourAttendanceById);
adminRoute.post("/labouradvance", handleLabourAdvance);
adminRoute.post("/staffadvance", handleStaffAdvance);
adminRoute.post(
  "/addbills",
  upload.fields([{ name: "photo", maxCount: 1 }]),
  handleBillAdding
);
adminRoute.get("/billslist", handleBillDetails);
adminRoute.get("/laboursalaryhistory", handleLabourHIstory);
adminRoute.get("/alllaboursalaryhistory", handleAllLabourHIstory);
adminRoute.post("/labourAttendanceEdit", labourAttendanceEdit);
adminRoute.post("/EditContract", handleEditContract);
adminRoute.post("/staffAttendanceEdit", stafffAttendanceEdit);
adminRoute.get("/allStaffsalaryhistory", handleAllStaffHIstory);
adminRoute.post(
  "/addprojectphotos",
  upload.fields([{ name: "photos", maxCount: 2 }]),
  handlePhotoAdding
);
adminRoute.post("/addmaterial", handleMaterialAdding);
adminRoute.get("/allmateriallist", handleMaterialList);
adminRoute.post("/purchasematerial", handleMaterialPurchase);
adminRoute.post('/completedprojects',handleCompletedProjects)
adminRoute.get('/materialtotal',handleMaterialTotal)
adminRoute.get('/PurchaseBillById',handlePurchaseById)
adminRoute.get('/PurchaseBillByDate',handlePurchaseByDate)

module.exports = adminRoute;
