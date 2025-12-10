import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { HiOutlineBars3 } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../hooks/useAuth";
import NavItem from "./NavItem";
import Logo from "./Logo";
import UserDropdown from "./UserDropdown";

const navLinksPublic = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/all-products" },
  { name: "Contact", path: "/contact" },
];

const navLinksPrivate = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/all-products" },
  { name: "Dashboard", path: "/dashboard" },
];

const Navbar = () => {
  const drawerId = "mobile-menu-drawer";
  const { user, signOutUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSignOut = () => {
    signOutUser().catch(console.log);
  };

  return (
    <header
      className={`fixed bg-base-100 w-full z-50 transition-all duration-500 text-base-content border-b ${
        isScrolled ? "shadow-md" : "py-1"
      }`}
    >
      <div className="drawer">
        <input id={drawerId} type="checkbox" className="drawer-toggle" />

        {/* MAIN DESKTOP NAVBAR */}
        <div className="drawer-content px-6 lg:px-12 py-2">
          <div className="navbar">
            {/* Left Side (Mobile menu + Logo) */}
            <div className="navbar-start flex items-center gap-3">
              <label htmlFor={drawerId} className="lg:hidden cursor-pointer">
                <HiOutlineBars3 size={32} />
              </label>
              <Logo />
            </div>

            {/* Center Menu */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu-horizontal gap-6">
                {(user ? navLinksPrivate : navLinksPublic).map((link) => (
                  <NavItem key={link.path} to={link.path} drawerId={drawerId}>
                    {link.name}
                  </NavItem>
                ))}
              </ul>
            </div>

            {/* Right Side */}
            <div className="navbar-end flex items-center gap-4">
              <ThemeToggle />

              {!user ? (
                <>
                  <Link to="/login" className="btn btn-outline btn-sm">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary btn-sm rounded-sm shadow-none"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <UserDropdown handleSignOut={handleSignOut} user={user} />
              )}
            </div>
          </div>
        </div>

        {/* MOBILE DRAWER MENU */}
        <div className="drawer-side z-50">
          <label
            htmlFor={drawerId}
            className="drawer-overlay bg-black/40 backdrop-blur-sm"
          ></label>

          <ul className="p-6 w-72 min-h-full bg-base-100 shadow-xl space-y-3">
            {/* Close button */}
            <div className="flex justify-end mb-4">
              <label htmlFor={drawerId}>
                <TfiClose size={24} className="cursor-pointer" />
              </label>
            </div>

            {/* Nav links */}
            {(user ? navLinksPrivate : navLinksPublic).map((link) => (
              <NavItem
                key={`mobile-${link.name}`}
                to={link.path}
                drawerId={drawerId}
              >
                {link.name}
              </NavItem>
            ))}

            {/* Mobile Login / Logout */}
            {!user ? (
              <div className="mt-6 space-y-3">
                <Link to="/login" className="btn btn-outline w-full">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary w-full">
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={handleSignOut}
                className="btn btn-error w-full mt-6 text-white"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
