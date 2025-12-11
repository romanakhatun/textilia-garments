import { NavLink, Outlet } from "react-router";
import { RiMenu2Line } from "react-icons/ri";
import {
  MdDashboard,
  MdProductionQuantityLimits,
  MdOutlineAddBox,
  MdPendingActions,
  MdApproval,
  MdPeopleAlt,
  MdShoppingBag,
  MdLogout,
} from "react-icons/md";
import { FaClipboardList, FaUserCircle } from "react-icons/fa";

import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { signOutUser } = useAuth();
  const { role } = useRole();
  // console.log(role);

  //  ADMIN Sidebar Menu
  const adminMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard size={22} /> },
    {
      name: "Manage Users",
      path: "manage-users",
      icon: <MdPeopleAlt size={22} />,
    },
    {
      name: "All Products",
      path: "all-products",
      icon: <MdShoppingBag size={22} />,
    },
    {
      name: "All Orders",
      path: "all-orders",
      icon: <FaClipboardList size={22} />,
    },
  ];

  //  MANAGER Sidebar Menu
  const managerMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard size={22} /> },
    {
      name: "Add Product",
      path: "add-product",
      icon: <MdOutlineAddBox size={22} />,
    },
    {
      name: "Manage Products",
      path: "manage-products",
      icon: <MdProductionQuantityLimits size={22} />,
    },
    {
      name: "Pending Orders",
      path: "pending-orders",
      icon: <MdPendingActions size={22} />,
    },
    {
      name: "Approved Orders",
      path: "approved-orders",
      icon: <MdApproval size={22} />,
    },
    {
      name: "Manager Profile",
      path: "profile",
      icon: <FaUserCircle size={22} />,
    },
  ];

  //  BUYER Sidebar Menu
  const buyerMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard size={22} /> },
    {
      name: "My Orders",
      path: "my-orders",
      icon: <FaClipboardList size={22} />,
    },
    {
      name: "Track Order",
      path: "track-order",
      icon: <MdPendingActions size={22} />,
    },
    {
      name: "Buyer Profile",
      path: "profile",
      icon: <FaUserCircle size={22} />,
    },
  ];

  // Choose menu by role
  const menu =
    role === "admin" ? adminMenu : role === "manager" ? managerMenu : buyerMenu;

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-white flex items-center gap-5 shadow-sm">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="cursor-pointer"
            >
              {/* Sidebar toggle icon */}
              <RiMenu2Line size={24} />
            </label>
            <Logo logoColor="text-black" />
          </nav>
          {/* Page content here */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible ">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start is-drawer-close:w-14 is-drawer-open:w-64 bg-white border-r pt-2.5">
            {/* Sidebar content here */}

            <ul className="menu w-full grow space-y-2">
              {menu.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    {...(item.path === "/dashboard" ? { end: true } : {})}
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-primary is-drawer-close:tooltip-right ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200"
                      }`
                    }
                    data-tip={item.name}
                  >
                    {/* Icon and Text */}
                    <div className="flex items-center gap-1">
                      <span>{item.icon}</span>
                      <h4 className="is-drawer-close:hidden">{item.name}</h4>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className="menu w-full mb-4">
              <li>
                <button
                  onClick={() => signOutUser()}
                  className="flex items-center gap-3 px-3 py-2 w-full rounded-md font-semibold hover:bg-error hover:text-white transition"
                >
                  <MdLogout size={22} />

                  <h4 className="is-drawer-close:hidden">Logout</h4>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
