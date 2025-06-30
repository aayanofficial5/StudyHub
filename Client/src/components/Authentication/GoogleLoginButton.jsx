import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import logo from "../../assets/googleLogo.svg";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice";

const GoogleLoginButton = ({ accountType }) => {
  // console.log(accountType);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const toastId = toast.loading("Signing in with Google...");
      dispatch(setLoading(true));

      try {
        const access_token = tokenResponse.access_token;

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/google`,
          { access_token, accountType },
          { withCredentials: true }
        );

        if (!res?.data?.success) {
          throw new Error(res?.data?.message || "Google login failed");
        }

        toast.success(res.data.message);

        const rawUser = res.data.user;
        const token = rawUser.token;

        const user = {
          ...rawUser,
          gender: rawUser.additionalDetails?.gender,
          dateOfBirth: rawUser.additionalDetails?.dateOfBirth,
          contactNumber: rawUser.additionalDetails?.contactNumber,
          about: rawUser.additionalDetails?.about,
        };

        dispatch(setToken(token));
        dispatch(setUser(user));

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard/my-profile");
      } catch (error) {
        console.error(
          "Google login error:",
          error.response?.data || error.message
        );
        toast.error(error?.response?.data?.message || "Google login failed");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
    },
    onError: () => toast.error("Google login failed"),
    flow: "implicit", // or 'auth-code' if backend handles code exchange
    scope: "profile email",
  });

  return (
    <button
      onClick={() => login()}
      className="w-full h-[44px] rounded-lg my-3 border-2 border-blue-500 hover:scale-95 transition-all duration-200 ease-in-out cursor-pointer"
    >
      <img src={logo} alt="Google" className="w-6 h-6 inline-block mr-3" />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
