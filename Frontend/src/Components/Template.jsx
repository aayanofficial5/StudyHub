import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import frameImage from "../assets/frameImage.png";
import logo from "../assets/googleLogo.svg";
export default function Template({
  title,
  desc1,
  desc2,
  formType,
  image,
  setIsLoggedIn,
}) {
  return (
    <div className="mt-2 flex  gap-5 mx-auto  justify-evenly">
      <div className="mt-10 sm:w-[320px] lg:w-[450px]">
        <h1 className="font-semibold text-3xl mb-3">{title}</h1>
        <p>
          <span className="text-gray-400 text-lg">{desc1}</span>
          <br></br>
          <i className="text-blue-400 text-[17px]">{desc2}</i>
        </p>
        <div className="my-6">
          {formType == "login" ? <LogInForm setIsLoggedIn={setIsLoggedIn}/> : <SignUpForm setIsLoggedIn={setIsLoggedIn} />}
        </div>
        <div className="flex items-center my-4">
          <div className="bg-gray-700 w-[45%] h-[1px] "></div>
          <span className="mx-2 text-gray-700">OR</span>
          <div className="bg-gray-700 w-[45%] h-[1px] "></div>
        </div>
        <button className="w-full h-[44px] rounded-lg border-1 border-gray-700 my-3">
          <img src={logo} alt="image" className="w-6 h-6 inline-block mr-3" />
          <span>Sign Up with Google</span>
        </button>
      </div>
      <div className="relative mt-15">
        <img src={frameImage} alt="" className="h-[40vh] lg:h-[55vh]" />
        <img
          src={image}
          alt=""
          className="h-[40vh] lg:h-[55vh] absolute top-[-15px] left-[-15px]"
        />
      </div>
    </div>
  );
}
