import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Navbar from "./components/Home/NavBar"
import Footer from "./components/Home/Footer"
import Login from "./pages/LogIn"
import Signup from "./pages/Signup.jsx"
import { useState } from "react"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const App = () => {
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Scroll to top when route changes
  const location = useLocation();
  
  const pathname = location.pathname;
  useEffect(() => {
    return window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-screen max-h-fit bg-black opacity-90 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} pathname={pathname}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn}/>} />
        </Routes>
      <Footer/>
    </div>
  )
}

export default App
