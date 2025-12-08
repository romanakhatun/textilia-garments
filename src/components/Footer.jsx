import { Link } from "react-router"; // Using 'react-router' as per your dependency
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaRegCopyright,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Used for the new X logo
import Logo from "./Logo";
import BackToTopButton from "./BackToTopButton";

// Data for the useful links section (based on assignment requirements)
const usefulLinks = [
  { name: "Home", path: "/" },
  { name: "All-Products", path: "/all-products" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "About Us", path: "/about" }, // Assuming '/about' is the About Us page
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-16 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* --- Main Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm max-w-xs text-base-content   leading-relaxed">
              The Garments Order & Production Tracker, simplifying factory
              workflow, inventory, and timely delivery for small-to-medium
              enterprises.
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div className="md:col-span-1">
            <h3 className="font-arsenal text-[22px] font-medium mb-5 text-base-content">
              Useful Links
            </h3>
            <ul className="space-y-3 text-base-content  ">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Legal Links*/}
          <div className="md:col-span-1">
            <h3 className="text-[22px] font-medium mb-5 text-base-content">
              Contact & Legal
            </h3>
            <ul className="space-y-3 text-base-content/80">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              {/* Dummy Contact Info based on image_64f69c.png */}
              <li className="pt-2 text-base-content">
                <span className="font-bold">Email:</span>{" "}
                proromana2004@gmail.com
              </li>
              <li>
                <span className="font-bold">Phone:</span> (+880) 179 6953902
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Social Media */}
          <div className="md:col-span-1">
            <h3 className="font-arsenal text-[22px] mb-5 text-base-content">
              Follow Us
            </h3>
            <p className="text-sm text-base-content/80">
              Stay connected for the latest updates in production management.
            </p>

            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/romana2004/"
                target="_blank"
                className="btn btn-circle bg-base-300 border-0 text-base-100 hover:bg-primary transition-colors"
              >
                <FaFacebook size={19} />
              </a>
              <a
                href="#"
                className="btn btn-circle bg-base-300 border-0 text-base-100 hover:bg-primary transition-colors"
              >
                <FaLinkedin size={19} />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/romanakhatun"
                className="btn btn-circle bg-base-300 border-0 text-base-100 hover:bg-primary transition-colors"
              >
                <FaXTwitter size={19} />
              </a>{" "}
              {/* New X Logo */}
              <a
                href="#"
                className="btn btn-circle bg-base-300 border-0 text-base-100 hover:bg-primary transition-colors"
              >
                <FaInstagram size={19} />
              </a>
            </div>
          </div>
        </div>

        {/* --- Copyright Section --- */}
        <div className="border-t border-base-300 py-4 text-sm text-base-content/70">
          <div className="flex items-center gap-1">
            <FaRegCopyright />
            <span>2025 Textilia Garments Tracker. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
