import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Home/NavBar";
import Footer from "./components/Home/Footer";
import Login from "./pages/LogIn";
import Signup from "./pages/Signup.jsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Courses from "./pages/Courses.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ResetPasswordLink from "./pages/ResetPasswordLink.jsx";
const App = () => {
  // Scroll to top when route changes
  const location = useLocation();

  const pathname = location.pathname;
  useEffect(() => {
    return window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-screen max-h-fit bg-black opacity-90 flex flex-col">
      <Navbar pathname={pathname} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course-list" element={<Courses />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/reset-password-link" element={<ResetPasswordLink />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
