import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import frameImage from "../../assets/frameImage.png";
import logo from "../../assets/googleLogo.svg";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

export default function Template({ title, desc1, desc2, formType, image }) {
  const loading = useSelector((state) => state.auth.loading);

  return (
    <div className="flex  gap-10 mx-auto  justify-around scale-85 -translate-5">
      {loading ? (
        <div class="flex justify-center items-center h-[75vh]">
        <Loading/>
      </div>
      
      ) : (
        <>
          <div className="sm:w-[320px] lg:w-[450px]">
            <h1 className="font-semibold text-2xl md:text-3xl mb-3">{title}</h1>
            <p>
              <span className="text-gray-400 text-base md:text-lg">{desc1}</span>
              <br></br>
              <i className="text-blue-400 text-base md:text-lg">{desc2}</i>
            </p>
            <div className="my-3">
              {formType == "login" ? <LogInForm /> : <SignUpForm />}
            </div>
            <div className="flex items-center">
              <div className="bg-gray-700 w-[45%] h-[1px] "></div>
              <span className="mx-2 text-gray-700">OR</span>
              <div className="bg-gray-700 w-[45%] h-[1px] "></div>
            </div>
            <button className="w-full h-[44px] rounded-lg my-3 border-2 border-blue-500 hover:scale-95 transition-all duration-200 ease-in-out cursor-pointer">
              <img
                src={logo}
                alt="image"
                className="w-6 h-6 inline-block mr-3"
              />
              <span>Continue with Google</span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-100 lg:mt-5">
            <div className="relative mt-15 lg:h-[60vh] lg:w-[40vw] sm:w-[32vw] sm:h-[28vh]">
              <img src={frameImage} alt="" className="h-full w-full" />
              <img
                src={image}
                alt=""
                className="h-full w-full absolute top-[-15px] left-[-15px]"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
