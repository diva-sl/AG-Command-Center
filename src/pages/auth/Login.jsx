import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ShieldCheck, Mail, Lock } from "lucide-react";

import { useLoginMutation } from "../../redux/services/authApi";
import { setCredentials } from "../../redux/slices/authSlice";

// import Lottie from "lottie-react";
import { default as Lottie } from "lottie-react";

import authAnimation from "../../assets/lottie/auth-animation.json";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData).unwrap();

      console.log("LOGIN RESPONSE:", res);

      if (res.user.role !== "admin") {
        alert("Admin access only");
        return;
      }

      dispatch(
        setCredentials({
          admin: res.user,
          token: res.token,
        }),
      );

      localStorage.setItem("adminToken", res.token);

      navigate("/");
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      alert(error?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-white to-slate-100">
      {/* LEFT SIDE */}

      <div
        className="
      hidden lg:flex
      w-1/2
      relative
      overflow-hidden
      bg-gradient-to-br
      from-[#511D43]
      via-[#6d2458]
      to-[#901E3E]
    "
      >
        {/* Glow */}

        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] bg-white/10 rounded-full blur-3xl" />

        {/* Content */}

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12">
          <div
            className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-[32px]
          p-6
          shadow-2xl
          w-full
          max-w-lg
        "
          >
            <Lottie.default
              animationData={authAnimation}
              loop
              className="w-full h-[320px]"
            />
          </div>

          <div className="text-center text-white mt-8 max-w-lg">
            <h1 className="text-5xl font-extrabold tracking-tight">
              AG Associates
            </h1>

            <p className="text-xl mt-4 text-white/90">
              Administration Command Center
            </p>

            <p className="mt-4 text-white/70 leading-relaxed">
              Manage users, subscriptions, transactions, documents, analytics
              and business operations from one centralized dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {/* Mobile Branding */}
          <div className="lg:hidden mb-6">
            <div
              className="
      bg-gradient-to-br
      from-[#511D43]
      via-[#6d2458]
      to-[#901E3E]
      rounded-[28px]
      p-5
      shadow-xl
      overflow-hidden
      relative
    "
            >
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="max-w-[220px] mx-auto">
                  <Lottie.default
                    animationData={authAnimation}
                    loop={true}
                    className="w-full h-40"
                  />
                </div>

                <div className="text-center text-white -mt-2">
                  <h1 className="text-2xl font-bold">AG Associates</h1>

                  <p className="text-white/80 text-sm mt-1">Admin Dashboard</p>
                </div>
              </div>
            </div>
          </div>
          {/* Login Card */}

          <div
            className="
          bg-white/90
          backdrop-blur-xl
          rounded-[32px]
          border
          border-white
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          overflow-hidden
        "
          >
            {/* Header */}

            <div className="px-8 pt-8 text-center">
              <div
                className="
              w-16 h-16
              mx-auto
              rounded-2xl
              bg-gradient-to-r
              from-[#511D43]
              to-[#901E3E]
              flex
              items-center
              justify-center
              shadow-lg
            "
              >
                <ShieldCheck size={28} className="text-white" />
              </div>

              <h2 className="text-3xl font-bold text-[#511D43] mt-5">
                Welcome Back
              </h2>

              <p className="text-slate-500 mt-2">Sign in to continue</p>
            </div>

            {/* Form */}

            <form onSubmit={submitHandler} className="p-8">
              {/* Email */}

              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    type="email"
                    required
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="
                  w-full
                  pl-12
                  pr-4
                  py-3.5
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#901E3E]
                "
                  />
                </div>
              </div>

              {/* Password */}

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    type="password"
                    required
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    className="
                  w-full
                  pl-12
                  pr-4
                  py-3.5
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#901E3E]
                "
                  />
                </div>
              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={isLoading}
                className="
              w-full
              py-4
              rounded-2xl
              text-white
              font-semibold
              bg-gradient-to-r
              from-[#511D43]
              via-[#6d2458]
              to-[#901E3E]
              shadow-lg
              hover:shadow-2xl
              hover:scale-[1.02]
              transition-all
              duration-300
              disabled:opacity-50
              disabled:hover:scale-100
            "
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {/* Footer */}

              <div className="text-center mt-6">
                <p className="text-xs text-slate-500">
                  Secure Administrator Access
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
