import { NavLink } from "react-router";

const NavItem = ({ to, children, drawerId }) => {
  return (
    <li>
      <NavLink
        to={to}
        onClick={() => (document.getElementById(drawerId).checked = false)}
        className={({ isActive }) =>
          `highlight-text tracking-wide text-xs font-medium uppercase 
            ${
              isActive
                ? "highlight-active text-primary"
                : "text-base-content hover:text-primary"
            }
          `
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
