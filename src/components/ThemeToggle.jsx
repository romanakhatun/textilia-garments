import useTheme from "../hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme} className="btn btn-sm border rounded-full">
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};

export default ThemeToggle;
