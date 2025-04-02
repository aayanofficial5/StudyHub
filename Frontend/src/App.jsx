import './App.css'
import {Routes,Route,Outlet, useNavigate, Navigate} from 'react-router-dom';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import Login from './Components/LogIn';

import NavBar from './Components/NavBar';
import { useEffect, useState } from 'react';
import EmailVerification from './Components/EmailVerification';
function App() {
 // function navigationHandler(){
 const [isLoggedIn,setIsLoggedIn] = useState(false);

  // }

  return (
    <div className=''>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></NavBar>
      <Routes>
        <Route path="/" element={<Outlet/>}>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/dashboard" element={isLoggedIn?(<Dashboard/>):(<Navigate to="/login"/>)}/>
          <Route path="/emailVerification" element={<EmailVerification/>}/>          
        </Route>
      </Routes>
    </div>
  );
}

export default App
