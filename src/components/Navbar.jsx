import { useEffect, useState } from "react";
import { Link } from "react-router";
import { HiOutlineBars3 } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../hooks/useAuth";
import NavItem from "./NavItem";
import Logo from "./Logo";

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

  const handleSignOut = () => {
    signOutUser().catch((err) => console.log(err));
  };

  return (
    <header
      className={`fixed bg-base-100  w-full z-50 transition-all duration-500 text-base-content border-b ${
        isScrolled ? "shadow-md" : "py-1"
      }`}
    >
      <div className="drawer">
        <input id={drawerId} type="checkbox" className="drawer-toggle" />

        {/* Main Navbar */}
        <div className="drawer-content px-6 lg:px-12 py-2">
          <div className="navbar">
            {/* Logo */}
            <div className="navbar-start flex items-center gap-3">
              {/* Mobile Menu Button */}
              <div className="lg:hidden cursor-pointer">
                <label htmlFor={drawerId}>
                  <HiOutlineBars3 size={32} />
                </label>
              </div>
              <Logo />
            </div>

            {/* Center Navigation (DESKTOP) */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu-horizontal gap-6">
                {navLinks.map((link) => (
                  <NavItem key={link.path} to={link.path} drawerId>
                    {link.name}
                  </NavItem>
                ))}
              </ul>
            </div>

            {/* Right Side */}
            <div className="navbar-end flex items-center md:gap-4">
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

        {/* mobile menu drawer */}
        <div className="drawer-side z-50">
          {/* full gray overlay*/}
          <label
            htmlFor={drawerId}
            className="drawer-overlay bg-black/40 backdrop-blur-sm"
          ></label>

          <ul className="p-6 w-72 min-h-full bg-base-100 shadow-xl">
            {/* close button */}
            <div className="flex justify-end mb-4">
              <label htmlFor={drawerId}>
                <TfiClose size={24} className="cursor-pointer" />
              </label>
            </div>

            <div className="flex flex-col items-center">
              {navLinks.map((link) => (
                <NavItem key={`mobile-${link.name}`} to={link.path}>
                  {link.name}
                </NavItem>
              ))}
            </div>

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
