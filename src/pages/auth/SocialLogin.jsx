import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { signInGoogleUser } = useAuth();
  const location = useLocation();
  console.log("location in social", location);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInGoogleUser()
      .then((result) => {
        console.log("google signin", result.user);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn text-gray-600 w-full flex items-center justify-center bg-[#E9ECF1]"
      >
        <span className="text-xl">
          <FcGoogle />
        </span>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
