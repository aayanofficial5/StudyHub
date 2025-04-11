import { useState } from "react";
import OtpInput from "react-otp-input";

const EmailVerification = () => {
  const [otp, setOtp] = useState(1);

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center items-center text-white w-full h-[80vh] text-3xl">
      <div className="w-[70vw] flex flex-col gap-4">
        <h1 className="font-semibold opacity-85">Verify Email</h1>
        <p className="text-lg opacity-60">
          A verification code has been sent to you. Enter the code below
        </p>
        <form>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="opacity-0">----</span>}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                className=" text-[50px] rounded-lg border-b-1 border-gray-700 h-13"
              />
            )}
          />
          <input
            onClick={handleFormSubmit}
            type="Submit"
            value="Verify Email"
            className="signup"
          />
        </form>
        <div className="text-base flex justify-between">
          <span className="">Back To Signup</span>
          <span>Resend it</span>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
