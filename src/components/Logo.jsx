import useTheme from "../hooks/useTheme";
import BlackLogo from "../assets/logo-black.png";
import WhiteLogo from "../assets/logo-white.png";
import { Link } from "react-router";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <Link to="/" className="flex items-center gap-2">
      {theme === "light" ? (
        <img src={BlackLogo} alt="Logo" className="h-7 lg:h-10 " />
      ) : (
        <img src={WhiteLogo} alt="Logo" className="h-7 lg:h-10" />
      )}
    </Link>
  );
};

export default Logo;
