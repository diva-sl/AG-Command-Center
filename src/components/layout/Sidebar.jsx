import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Crown,
  BookOpen,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { logout } from "../../redux/slices/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const handleLogout = () => {
  //     localStorage.removeItem("adminToken");

  //     dispatch(logout());

  //     navigate("/login");
  //   };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },

    {
      name: "Users",
      path: "/users",
      icon: Users,
    },

    {
      name: "Transactions",
      path: "/transactions",
      icon: CreditCard,
    },

    {
      name: "Documents",
      path: "/documents",
      icon: FileText,
    },

    {
      name: "Subscription Plans",
      path: "/subscriptions",
      icon: Crown,
    },

    {
      name: "Success Stories",
      path: "/success-stories",
      icon: BookOpen,
    },

    // {
    //   name: "Story Analytics",
    //   path: "/success-stories/analytics",
    //   icon: BarChart3,
    // },

    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: Users,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="h-screen bg-[#511D43] text-white w-72 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">AG Command Center</h1>

        <p className="text-slate-400 text-sm">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#511D43] shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:bg-white/10"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      {/* 
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div> */}
    </aside>
  );
};

export default Sidebar;
