import Template from "./Template";
import login from "../assets/login.png";
export default function Login({setIsLoggedIn}){
  return <div className="text-white">
    <Template 
    title="Welcome Back"
    desc1="Build skills for today, tomorrow, and beyond."
    desc2="Education to future-proof your career."
    formType="login"
    image={login}
    setIsLoggedIn={setIsLoggedIn}
    ></Template>
    
  </div>;
}