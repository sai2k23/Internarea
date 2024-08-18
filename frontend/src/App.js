import './App.css';
import Navbar from './Componets/Navbar/Navbar';
import Home from './Componets/Home/Home';
import Footer from './Componets/Footerr/Footer';
import { Routes,Route } from 'react-router-dom';
import Register from './Componets/auth/Register';
import Intern from "./Componets/Internships/Intern"
import JobAvl from "./Componets/Job/JobAvl"
import JobDetail from './Componets/Job/JobDetail';
import InternDetail from './Componets/Internships/InternDetail';
import { login, logout, selectUser } from "./Feature/Userslice"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import Postinternships from './Admin/Postinternships';
import ViewAllApplications from './Admin/ViewAllApplications';
import DetailApplications from './Applications/DetailApplications';
import UserApplicatiom from './profile/UserApplicatiom';
import UserapplicationDetail from "./Applications/DetailApplicationUser"
function App() {
const user=useSelector(selectUser);
const dispatch=useDispatch();
useEffect(()=>{
  auth.onAuthStateChanged((authuser)=>{
    if (authuser) {
      dispatch(login({
        uid: authuser.uid,
        photo: authuser.photoURL,
        name: authuser.displayName,
        email: authuser.email,

      }))}
    else{
      dispatch(logout())
    }
  })
},[dispatch]);
  return (
    <div className="App">
     <Navbar/>

     <Routes>
      <Route path='/' element={ <Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/internship' element={<Intern/>}/>
      <Route path='/Jobs' element={<JobAvl/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/detailjob' element={<JobDetail/>}/>
      <Route path='/detailInternship' element={<InternDetail/>}/>
      <Route path='/detailApplication' element={<DetailApplications/>}/>
      <Route path='/adminLogin' element={<AdminLogin/>}/>
      <Route path='/adminepanel' element={<Adminpanel/>}/>
      <Route path='/postInternship' element={<Postinternships/>}/>
      <Route path='/applications' element={<ViewAllApplications/>}/>
      <Route path='/UserapplicationDetail' element={< UserapplicationDetail/>}/>
      <Route path='/userapplication' element={<UserApplicatiom/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
