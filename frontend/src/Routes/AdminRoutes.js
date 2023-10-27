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
       <Route path='/login' element={adminToken?<AdminDashboard/>:<LoginPage/>}/>
       <Route path='/dashboard' element={adminToken?<AdminDashboard/>:<LoginPage/>}/>
       <Route path='/labourdetails' element={adminToken?<LabourControll/>:<LoginPage/>}/>
       <Route path='/projectdetails' element={adminToken?<ProjectDisplay/>:<LoginPage/>}/>
       <Route path='/staffdetails' element={adminToken?<StaffControll/>:<LoginPage/>}/>
       <Route path='/officedetails' element={adminToken?<OfficeControll/>:<LoginPage/>}/>
       <Route path='/contractdetails' element={adminToken?<ContractControll/>:<LoginPage/>}/>
       <Route path='/materials' element={adminToken?<Materials/>:<LoginPage/>}/>
       <Route path='/addlabour' element={adminToken?<LabourAdding/>:<LoginPage/>}/>
       <Route path='/addcontract' element={adminToken?<ContractAdding/>:<LoginPage/>}/>
       <Route path='/addbills' element={adminToken?<Addbills/>:<LoginPage/>}/>
       <Route path='/addproject' element={adminToken?<ProjectAdding/>:<LoginPage/>}/>
       <Route path='/editproject' element={adminToken?<ProjectEditing/>:<LoginPage/> }/>{/*edited*/}
       <Route path='/addstaff' element={adminToken?<StaffAdding/>:<LoginPage/>}/>
       <Route path='/projectlist' element={adminToken?<ProjectLists/>:<LoginPage/>}/>
       
       {/* start */}
       <Route path='/labourattendance' element={adminToken?<LabourAttendance/>:<LoginPage/>}/>
       <Route path='/staffattendance' element={adminToken?<StaffAttendance/>:<LoginPage/>}/>
       <Route path='/utilitybills' element={adminToken?<UtilityBill/>:<LoginPage/>}/>
       <Route path='/contractview' element={adminToken?<SingleviewContract/>:<LoginPage/>}/>
       <Route path='/projectview' element={adminToken?<Singleviewproject/>:<LoginPage/>}/>
       <Route path='/attendancesingle' element={adminToken?<SingleViewAttendance/>:<LoginPage/>}/>
       <Route path='/viewsalary' element={adminToken?<ViewSalary/>:<LoginPage/>}/>
       <Route path='/viewprofile' element={adminToken?<ProfilePage/>:<LoginPage/>}/>
       <Route path='/staffsalary' element={adminToken?<StaffSalary/>:<LoginPage/>}/>
       <Route path='/staffprofile' element={adminToken?<StaffProfile/>:<LoginPage/>}/>
       <Route path='/completedprojects' element={adminToken?<Completed/>:<LoginPage/>}/>
       <Route path='/completedbills' element={adminToken?<CompletedBills/>:<LoginPage/>}/>
       <Route path='/billsingleview' element={adminToken?<BillSingleView/>:<LoginPage/>}/>
       <Route path='/salaryhistory' element={adminToken?<SalaryHistoryDisplay/>:<LoginPage/>}/>
       <Route path='/weeklysalary' element={adminToken?<SalaryWeek/>:<LoginPage/>}/>
       <Route path='/editcontract' element={adminToken?<ContractEdit/>:<LoginPage/>}/>
       <Route path='/weeklystaffsalary' element={adminToken?<StaffWeekSalary/>:<LoginPage/>}/>
       <Route path='/salarymanagement' element={adminToken?<SalaryManagement/>:<LoginPage/>}/>
       <Route path='/purchasematerial' element={adminToken?<Purchase/>:<LoginPage/>}/>
    </Routes>
    </div>
  )
}

export default AdminRoutes
