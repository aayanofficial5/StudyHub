import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function Password({ passwordType, passwordName, handleLoginData, name ,showP, setShowP,loginFormData}) {
  function handlePassword(name,setShowP) {
    console.log(name);
    setShowP((prev) => (!prev));
  }
  
  return (
      <label htmlFor={passwordType} className="relative">
        {passwordName}
        <sup>*</sup>
        <input
          className="w-full h-12 p-3 rounded-lg mt-1 text-[15px]"
          onChange={handleLoginData}
          required
          type={showP ? "text" : "password"}
          name={passwordType}
          id={passwordType}
          placeholder="Enter Password"
          value={loginFormData[passwordType]}
        />
        <span className="absolute top-9 right-1 text-2xl">
          {showP ? (
            <IoEyeOffOutline onClick={()=>handlePassword(name,setShowP)}  />
          ) : (
            <IoEyeOutline onClick={()=>handlePassword(name,setShowP)} />
          )}
        </span>
      </label>
    );
  }  
