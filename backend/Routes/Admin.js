const express=require('express')
const adminRoute=express()
const {handleSignIn,handleSignUp}=require('../controllers/Admin/AdminController')
const{handleLabourAdding,handleLabourDetails,handleAttendance,salarycalculationoflabour,handleLabourById,labourAttendanceById,salarycalculation,handleAttendanceList,handleLabourAdvance,handleLabourHIstory,handleAllLabourHIstory,labourAttendanceEdit}=require('../controllers/Admin/LabourController')
const{handleStaffAdding,handleStaffDetails,handleAttendanceofStaff,salarycalculationofStaff,handleStaffById,handleAttendanceListofStaff,handleStaffAdvance,salarycalculationforStaff}=require('../controllers/Admin/StaffController')
const{handleProjectAdding,ProjectList,ProjectListById}=require('../controllers/Admin/ProjectController')
const{handleAddContract,ContractList,ContractListById}=require('../controllers/Admin/ContractController')
const {handleBillAdding,handleBillDetails}=require("../controllers/Admin/BillController")
const upload=require('../Middleware/Multer')
const Auth=require('../Middleware/Auth')

//The routes for admin authentication

adminRoute.post('/login',handleSignIn)
adminRoute.post('/signup',handleSignUp)
adminRoute.post('/addlabour',upload.fields([{ name: 'proof', maxCount: 1 }, { name: 'photo', maxCount: 1 }]),handleLabourAdding)
adminRoute.get('/labourslist',handleLabourDetails)
adminRoute.get('/labourbyid',handleLabourById)
adminRoute.post('/addstaff',upload.fields([{ name: 'proof', maxCount: 1 }, { name: 'photo', maxCount: 1 }]),handleStaffAdding)
adminRoute.get('/staffslist',handleStaffDetails)
adminRoute.get('/staffByid',handleStaffById)
adminRoute.post('/labourattendance',handleAttendance)
adminRoute.get('/labourattendancelist',handleAttendanceList)
adminRoute.post('/staffattendance',handleAttendanceofStaff)
//.......attendancelist
adminRoute.get('/staffattendanceList',handleAttendanceListofStaff)
adminRoute.get('/salarycalculation',salarycalculationoflabour)
adminRoute.post('/salaryoflabour',salarycalculation)
adminRoute.post('/salaryofStaff',salarycalculationforStaff)
adminRoute.get('/staffsalary',salarycalculationofStaff)
adminRoute.post('/addproject',handleProjectAdding)
adminRoute.post('/AddContract',handleAddContract)
adminRoute.get('/ContractList',ContractList)
adminRoute.get('/ContractById',ContractListById)
adminRoute.get('/projectList',ProjectList)
adminRoute.get('/projectById',ProjectListById)
adminRoute.get('/labourattendanceById',labourAttendanceById)
adminRoute.post('/labouradvance',handleLabourAdvance)
adminRoute.post('/staffadvance',handleStaffAdvance)
adminRoute.post('/addbills',upload.fields([{ name: 'photo', maxCount: 1 }]),handleBillAdding)
adminRoute.get('/billslist',handleBillDetails)
adminRoute.get('/laboursalaryhistory',handleLabourHIstory)
adminRoute.get('/alllaboursalaryhistory',handleAllLabourHIstory)
adminRoute.post('/labourAttendanceEdit',labourAttendanceEdit)

module.exports=adminRoute