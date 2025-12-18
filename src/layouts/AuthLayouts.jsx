import { Outlet } from "react-router";
import SocialLogin from "../pages/auth/SocialLogin";
import Logo from "../components/Logo";
import AuthImg from "../assets/authImg.jpg";

const AuthLayouts = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
        <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <div className="mb-8">
                <Logo />
              </div>

              <Outlet />

              <SocialLogin />
            </div>

            <div className="hidden md:flex items-center justify-center bg-[#fafdf0]">
              <div className="p-8">
                <img src={AuthImg} alt="AuthImg" className="max-w-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayouts;
