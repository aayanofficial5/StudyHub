import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Password({
  passwordType,
  passwordName,
  handleLoginData,
  name,
  showP,
  setShowP,
  loginFormData,
  forgot = false,
}) {
  const navigate = useNavigate();

  function handlePasswordToggle(name, setShowP) {
    setShowP((prev) => !prev);
  }

  return (
    <div className="relative w-full">
      <label htmlFor={passwordType} className="block text-sm sm:text-base font-medium text-gray-300 mb-1">
        {passwordName}
        <sup className="text-red-500 text-[14px] ml-0.5">*</sup>
      </label>

      <div className="relative">
        <input
          id={passwordType}
          name={passwordType}
          type={showP ? "text" : "password"}
          placeholder="Enter Password"
          onChange={handleLoginData}
          required
          value={loginFormData[passwordType]}
          className="w-full h-12 px-3 pr-10 text-sm sm:text-base rounded-lg border-2 border-gray-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />

        <span className="absolute top-1/2 -translate-y-1/2 right-3 text-xl cursor-pointer text-gray-400">
          {showP ? (
            <IoEyeOffOutline onClick={() => handlePasswordToggle(name, setShowP)} />
          ) : (
            <IoEyeOutline onClick={() => handlePasswordToggle(name, setShowP)} />
          )}
        </span>
      </div>

      {forgot && (
        <div className="mt-1 text-right">
          <p
            onClick={() => navigate("/reset-password-link")}
            className="text-xs sm:text-sm text-blue-400 hover:underline cursor-pointer"
          >
            Forgot Password?
          </p>
        </div>
      )}
    </div>
  );
}
