import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import { HiOutlineBars3 } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import LogoImg from "../assets/logo-black.png";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../hooks/useAuth";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/all-products" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const drawerId = "mobile-menu-drawer";
  const { user, signOutUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Scroll Background Change
  useEffect(() => {
    const scrollHandler = () => {
      setIsScrolled(window.scrollY > 5);
    };
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const NavItem = ({ to, children }) => (
    <li>
      <NavLink
        to={to}
        onClick={() => (document.getElementById(drawerId).checked = false)}
        className={({ isActive }) =>
          `px-4 py-2 tracking-wide text-sm font-medium uppercase transition-colors hover:bg-none duration-200
          ${
            isActive ? "text-base-200" : "text-base-content hover:text-primary"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );

  const handleSignOut = () => {
    signOutUser().catch((err) => console.log(err));
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 text-base-content ${
        isScrolled ? "bg-base-300 shadow-sm" : "bg-base-100"
      }`}
    >
      <div className="drawer">
        <input id={drawerId} type="checkbox" className="drawer-toggle" />

        {/* Main Navbar */}
        <div className="drawer-content px-6 lg:px-12 py-4">
          <div className="navbar">
            {/* Logo */}
            <div className="navbar-start flex items-center gap-3">
              {/* Mobile Menu Button */}
              <div className="lg:hidden cursor-pointer">
                <label htmlFor={drawerId}>
                  <HiOutlineBars3 size={32} />
                </label>
              </div>

              <Link to="/" className="flex items-center gap-2">
                <img src={LogoImg} alt="Logo" className="h-10" />
              </Link>
            </div>

            {/* Center Navigation (DESKTOP) */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal gap-6">
                {navLinks.map((link) => (
                  <NavItem key={link.path} to={link.path}>
                    {link.name}
                  </NavItem>
                ))}
              </ul>
            </div>

            {/* Right Side */}
            <div className="navbar-end flex items-center gap-4">
              <ThemeToggle />

              {user ? (
                <button
                  onClick={handleSignOut}
                  className="px-6 py-2 border border-base-300 rounded-lg hover:bg-base-300 hover:text-white transition "
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        <div className="drawer-side z-50">
          {/* FULL GRAY OVERLAY */}
          <label
            htmlFor={drawerId}
            className="drawer-overlay bg-black/40 backdrop-blur-sm"
          ></label>

          <ul className="p-6 w-72 min-h-full bg-base-100 shadow-xl">
            {/* CLOSE BUTTON */}
            <div className="flex justify-end mb-4">
              <label htmlFor={drawerId}>
                <TfiClose size={24} className="cursor-pointer" />
              </label>
            </div>

            {navLinks.map((link) => (
              <NavItem key={`mobile-${link.name}`} to={link.path}>
                {link.name}
              </NavItem>
            ))}

            {/* Mobile Login/Logout */}
            <div className="mt-6">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline w-full"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="btn btn-outline w-full">
                  Login
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
