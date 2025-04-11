import Template from "../components/Authentication/Template";
import signup from "../assets/signup.png";

export default function SignUp({ setIsLoggedIn }) {
  return (
    <div className="text-white ">
      <Template
        title="Join the millions learning to code with StudyNotion for free"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        formType="signup"
        image={signup}
        setIsLoggedIn={setIsLoggedIn}
      ></Template>
    </div>
  );
}
