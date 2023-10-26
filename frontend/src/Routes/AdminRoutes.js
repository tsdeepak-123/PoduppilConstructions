import React, { useEffect } from 'react'
import AdminHome from '../pages/AdminPages/AdminHome'
import { Routes,Route } from 'react-router-dom'
import AdminDashboard from '../pages/AdminPages/AdminDashboard'
import LoginPage from '../pages/AdminPages/LoginPage'
import LabourControll from '../pages/AdminPages/Labour/LabourControll'
import ProjectDisplay from '../pages/AdminPages/ProjectDisplay'
import StaffControll from '../pages/AdminPages/StaffControll'
import OfficeControll from '../pages/AdminPages/OfficeControll'
import ContractControll from '../pages/AdminPages/ContractControll'
import LabourAdding from '../pages/AdminPages/Labour/LabourAdding'
import ContractAdding from '../pages/AdminPages/Contract/ContractAdding'
import ContractEdit from '../pages/AdminPages/Contract/ContractEdit'
import Addbills from '../pages/AdminPages/Office/Addbills'
import ProjectAdding from '../pages/AdminPages/Project/ProjectAdding'
import StaffAdding from '../pages/AdminPages/Staff/StaffAdding'
import Materials from '../pages/AdminPages/Materials/Materials'
import ProjectLists from '../pages/AdminPages/Project/ProjectLists'
import LabourAttendance from '../pages/AdminPages/Office/LabourAttendance'
import BillSingleView from '../pages/AdminPages/Office/BillSingleView'
import CompletedBills from '../pages/AdminPages/Office/CompletedBills'
import StaffAttendance from '../pages/AdminPages/Office/StaffAttendance'
import UtilityBill from '../pages/AdminPages/Office/UtilityBill'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { AdminAction } from '../Stores/AdminAuth';
import SingleviewContract from '../pages/AdminPages/Contract/SingleviewContract'
import Singleviewproject from '../pages/AdminPages/Project/Singleviewproject'
import SingleViewAttendance from '../pages/AdminPages/Labour/SingleViewAttendance'
import ViewSalary from '../pages/AdminPages/ViewSalary/ViewSalary'
import SalaryHistoryDisplay from '../pages/AdminPages/ViewSalary/SalaryHistoryDisplay'
import SalaryWeek from '../pages/AdminPages/ViewSalary/SalaryWeek'
import ProfilePage from '../pages/AdminPages/Labour/ProfilePage'
import StaffSalary from '../pages/AdminPages/Staff/StaffSalary'
import StaffProfile from '../pages/AdminPages/Staff/StaffProfile'
import ProjectEditing from '../pages/AdminPages/Project/ProjectEditing'
import Completed from '../pages/AdminPages/Project/Completed'
import StaffWeekSalary from '../pages/AdminPages/ViewSalary/StaffWeekSalary'
import SalaryManagement from "../pages/AdminPages/ViewSalary/SalaryManagement"
import Purchase from '../pages/AdminPages/Materials/Purchase'
import PaidBills from '../pages/AdminPages/Office/PaidBills'

function AdminRoutes() {
  const [cookies, setCookies] = useCookies(['AdminsecretKey']);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(cookies).length > 0) {
      dispatch(AdminAction.AddAdmin({ token: cookies?.AdminsecretKey }));
    }
  }, [dispatch]);

  const adminToken = useSelector((state) => state?.Admin?.AdminToken);
  console.log('adminnnnnnn',adminToken);

  return (
    <div>
       <Routes>
       <Route path='/' element={<AdminHome/>}/>
       <Route path='/login' element={<LoginPage/>}/>
       <Route path='/dashboard' element={<AdminDashboard/>}/>
       <Route path='/labourdetails' element={<LabourControll/>}/>
       <Route path='/projectdetails' element={<ProjectDisplay/>}/>
       <Route path='/staffdetails' element={<StaffControll/>}/>
       <Route path='/officedetails' element={<OfficeControll/>}/>
       <Route path='/contractdetails' element={<ContractControll/>}/>
       <Route path='/materials' element={<Materials/>}/>
       <Route path='/addlabour' element={<LabourAdding/>}/>
       <Route path='/addcontract' element={<ContractAdding/>}/>
       <Route path='/addbills' element={<Addbills/>}/>
       <Route path='/addproject' element={<ProjectAdding/>}/>
       <Route path='/editproject' element={<ProjectEditing/>}/>{/*edited*/}
       <Route path='/addstaff' element={<StaffAdding/>}/>
       <Route path='/projectlist' element={<ProjectLists/>}/>
       
       {/* start */}
       <Route path='/labourattendance' element={<LabourAttendance/>}/>
       <Route path='/staffattendance' element={<StaffAttendance/>}/>
       <Route path='/utilitybills' element={<UtilityBill/>}/>
       <Route path='/contractview' element={<SingleviewContract/>}/>
       <Route path='/projectview' element={<Singleviewproject/>}/>
       <Route path='/attendancesingle' element={<SingleViewAttendance/>}/>
       <Route path='/viewsalary' element={<ViewSalary/>}/>
       <Route path='/viewprofile' element={<ProfilePage/>}/>
       <Route path='/staffsalary' element={<StaffSalary/>}/>
       <Route path='/staffprofile' element={<StaffProfile/>}/>
       <Route path='/completedprojects' element={<Completed/>}/>
       <Route path='/completedbills' element={<CompletedBills/>}/>
       <Route path='/billsingleview' element={<BillSingleView/>}/>
       <Route path='/salaryhistory' element={<SalaryHistoryDisplay/>}/>
       <Route path='/weeklysalary' element={<SalaryWeek/>}/>
       <Route path='/editcontract' element={<ContractEdit/>}/>
       <Route path='/weeklystaffsalary' element={<StaffWeekSalary/>}/>
       <Route path='/salarymanagement' element={<SalaryManagement/>}/>
       <Route path='/purchasematerial' element={<Purchase/>}/>
       <Route path='/paidbills' element={<PaidBills/>}/>
    </Routes>
    </div>
  )
}

export default AdminRoutes
