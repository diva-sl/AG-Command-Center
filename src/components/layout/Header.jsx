import { useState, useRef, useEffect } from "react";

import {
  Menu,
  Bell,
  CalendarDays,
  ShieldCheck,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../../redux/slices/authSlice";

import { useSelector } from "react-redux";

const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const { admin } = useSelector((state) => state.auth);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("adminToken");

    dispatch(logout());

    navigate("/login");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-40
        bg-white/90
        backdrop-blur-xl
        border-b
        border-[#901E3E]/10
      "
    >
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Side */}

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="
                lg:hidden
                w-11
                h-11
                rounded-xl
                bg-[#511D43]/10
                text-[#511D43]
                flex
                items-center
                justify-center
              "
            >
              <Menu size={22} />
            </button>

            <div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#901E3E] font-semibold">
                  AG Associates
                </p>

                <h1 className="text-xl md:text-2xl font-bold text-[#511D43]">
                  Admin Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <CalendarDays size={14} />
                {today}
              </div>
            </div>
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-3">
            {/* Notifications */}

            <button
              className="
                relative
                w-11
                h-11
                rounded-xl
                bg-slate-100
                hover:bg-slate-200
                transition
                flex
                items-center
                justify-center
              "
            >
              <Bell size={20} />

              <span
                className="
                  absolute
                  top-2
                  right-2
                  w-2
                  h-2
                  rounded-full
                  bg-[#901E3E]
                "
              />
            </button>

            {/* Admin Card */}

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="
      flex
      items-center
      gap-3
      bg-white
      border
      border-[#901E3E]/10
      rounded-2xl
      px-3
      py-2
      shadow-sm
      hover:shadow-md
      transition-all
    "
              >
                <img
                  src={
                    admin?.avatar ||
                    `https://ui-avatars.com/api/?name=${admin?.name}&background=511D43&color=fff`
                  }
                  alt={admin?.name}
                  className="
        w-11
        h-11
        rounded-full
        border-2
        border-[#901E3E]/20
      "
                />

                <div className="hidden md:block text-left">
                  <p className="font-semibold text-[#511D43] leading-none">
                    {admin?.name}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <ShieldCheck size={12} />
                    Administrator
                  </div>
                </div>

                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div
                  className="
        absolute
        right-0
        mt-3
        w-64
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-xl
        overflow-hidden
        z-50
      "
                >
                  <div className="p-4 border-b">
                    <p className="font-semibold text-[#511D43]">
                      {admin?.name}
                    </p>

                    <p className="text-sm text-slate-500 truncate">
                      {admin?.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/profile");
                      setProfileOpen(false);
                    }}
                    className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          hover:bg-slate-50
          transition
        "
                  >
                    <User size={18} />
                    My Profile
                  </button>

                  <button
                    onClick={logoutHandler}
                    className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          text-red-600
          hover:bg-red-50
          transition
        "
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
