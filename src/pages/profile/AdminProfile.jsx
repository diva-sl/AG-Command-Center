import DashboardLayout from "../../components/layout/DashboardLayout";

import { useSelector } from "react-redux";

import { User, Mail, ShieldCheck, Calendar, Settings } from "lucide-react";

const AdminProfile = () => {
  const { admin } = useSelector((state) => state.auth);

  const [avatarError, setAvatarError] = useState(false);

  const initials =
    admin?.name
      ?.split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "A";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 -m-6 p-4 md:p-6">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#511D43]">
            Administrator Profile
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your account information and administrator settings.
          </p>
        </div>

        {/* Profile Card */}

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#901E3E]/10">
          {/* Profile Banner */}

          <div
            className="
              bg-gradient-to-r
              from-[#511D43]
              via-[#6d2458]
              to-[#901E3E]
              p-6
              md:p-10
            "
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {admin?.avatar && !avatarError ? (
                <img
                  src={admin.avatar}
                  alt={admin.name}
                  onError={() => setAvatarError(true)}
                  className="
      w-28
      h-28
      md:w-32
      md:h-32
      rounded-full
      border-4
      border-white
      shadow-xl
      bg-white
      object-cover
      shrink-0
    "
                />
              ) : (
                <div
                  className="
      w-28
      h-28
      md:w-32
      md:h-32
      rounded-full
      border-4
      border-white
      shadow-xl
      bg-gradient-to-r
      from-[#511D43]
      to-[#901E3E]
      text-white
      flex
      items-center
      justify-center
      text-3xl
      md:text-4xl
      font-bold
      shrink-0
    "
                >
                  {initials}
                </div>
              )}
              <div className="text-center md:text-left text-white">
                <h2 className="text-2xl md:text-3xl font-bold break-words">
                  {admin?.name}
                </h2>

                <p className="text-white/80 mt-2 break-all">{admin?.email}</p>

                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium">
                    Administrator
                  </span>

                  <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-100 text-sm font-medium">
                    Active Account
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}

          <div className="p-6 md:p-8">
            {/* Info Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              <InfoCard
                icon={<User size={20} />}
                title="Full Name"
                value={admin?.name}
              />

              <InfoCard
                icon={<Mail size={20} />}
                title="Email Address"
                value={admin?.email}
              />

              <InfoCard
                icon={<ShieldCheck size={20} />}
                title="Role"
                value="Administrator"
              />

              <InfoCard
                icon={<Settings size={20} />}
                title="Access Level"
                value="Full Access"
              />
            </div>

            {/* Account Overview */}

            <div className="mt-8 bg-slate-50 rounded-3xl p-6 border">
              <h3 className="text-xl font-bold text-[#511D43] mb-5">
                Account Overview
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl p-5 border shadow-sm">
                  <p className="text-slate-500 text-sm">Account Type</p>

                  <h4 className="font-bold text-lg mt-2 text-[#511D43]">
                    Super Admin
                  </h4>
                </div>

                <div className="bg-white rounded-2xl p-5 border shadow-sm">
                  <p className="text-slate-500 text-sm">Status</p>

                  <h4 className="font-bold text-lg text-green-600 mt-2">
                    Active
                  </h4>
                </div>

                <div className="bg-white rounded-2xl p-5 border shadow-sm">
                  <p className="text-slate-500 text-sm">Dashboard Access</p>

                  <h4 className="font-bold text-lg mt-2 text-[#511D43]">
                    Enabled
                  </h4>
                </div>
              </div>
            </div>

            {/* Security Information */}

            <div className="mt-8 bg-white rounded-3xl border p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#901E3E]/10 flex items-center justify-center">
                  <Calendar size={20} className="text-[#901E3E]" />
                </div>

                <h3 className="text-xl font-bold text-[#511D43]">
                  Security Information
                </h3>
              </div>

              <p className="text-slate-500 leading-relaxed">
                This administrator account has complete access to users,
                transactions, documents, subscriptions, analytics, success
                stories, reports, and all management modules available in the AG
                Associates Admin Dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition">
    <div
      className="
        w-10
        h-10
        rounded-xl
        bg-[#901E3E]/10
        text-[#901E3E]
        flex
        items-center
        justify-center
        mb-4
      "
    >
      {icon}
    </div>

    <p className="text-sm text-slate-500">{title}</p>

    <h4 className="font-semibold mt-2 break-all text-[#511D43]">
      {value || "-"}
    </h4>
  </div>
);

export default AdminProfile;
