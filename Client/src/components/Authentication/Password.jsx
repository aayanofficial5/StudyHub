import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function Password({ passwordType, passwordName, handleLoginData, name ,showP, setShowP,loginFormData,forgot=false}) {
  function handlePassword(name,setShowP) {
    console.log(name);
    setShowP((prev) => (!prev));
  }
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      <label htmlFor={passwordType} className="">
        {passwordName}
        <sup className="text-red-500 text-[16px] relative -top-1 -right-0.5">*</sup>
        <input
          className="w-full h-12 p-3 rounded-lg mt-1 text-[15px] border-2 border-gray-700 focus:outline-none focus:border-blue-500"
          onChange={handleLoginData}
          required
          type={showP ? "text" : "password"}
          name={passwordType}
          id={passwordType}
          placeholder="Enter Password"
          value={loginFormData[passwordType]}
        />
      </label>
      <span className="absolute top-10 right-3 text-2xl cursor-pointer">
          {showP ? (
            <IoEyeOffOutline onClick={()=>handlePassword(name,setShowP)} className="text-gray-500" />
          ) : (
            <IoEyeOutline onClick={()=>handlePassword(name,setShowP)} className="text-gray-500" />
          )}
        </span>
        {forgot&&<p
            onClick={() => navigate("/reset-password-link")}
            className="text-[12px] text-blue-400 absolute top-20 right-[-9px] w-25 cursor-pointer"
          >
            Forgot Password
          </p>}
    </div>
    );
  }  
