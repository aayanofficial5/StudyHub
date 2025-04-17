import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/LogIn.jsx";
import Signup from "./pages/Signup.jsx";
import Courses from "./pages/Courses.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ResetPasswordLink from "./pages/ResetPasswordLink.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Components
import Navbar from "./components/Home/NavBar.jsx";
import Footer from "./components/Home/Footer.jsx";
import MyProfile from "./components/Dashboard/MyProfile.jsx";
import EnrolledCourses from "./components/Dashboard/EnrolledCourses.jsx";
import Cart from "./components/Dashboard/Cart.jsx";
import Settings from "./components/Dashboard/Settings.jsx";
import NotFound from './pages/NotFound';

const App = () => {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Don't return it
  }, [pathname]);

  return (
    <div className="max-h-fit bg-black opacity-90 flex flex-col w-screen mx-auto">
      <Routes>
        <Route path="/" element={<Navbar />} >
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/course-list" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/reset-password-link" element={<ResetPasswordLink />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route element={<Dashboard />} >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="/dashboard/cart" element={<Cart />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default App;
