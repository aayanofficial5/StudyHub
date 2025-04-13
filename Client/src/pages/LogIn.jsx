import Template from "../components/Authentication/Template";
import login from "../assets/login.jpg";
import { useSelector } from "react-redux";
export default function Login() {
  const {loading} = useSelector((state) => state.auth);
  return (
    <div className={`text-white h-[80vh] ${loading ? "mt-2" : "mt-20"}`}>
      <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        formType="login"
        image={login}
      ></Template>
    </div>
  );
}
