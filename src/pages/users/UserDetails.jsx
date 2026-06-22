import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  UserCog,
  Calendar,
  CreditCard,
  Eye,
  Download,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";

import { useGetUserByIdQuery } from "../../redux/services/userApi";

const UserDetails = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUserByIdQuery(id);

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center">User not found</div>
      </DashboardLayout>
    );
  }

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const showAvatar =
    user?.avatar && !user.avatar.includes("googleusercontent.com");

  const KycAdminCard = ({ title, value, status, reason }) => {
    const styles = {
      approved: "bg-green-100 text-green-700 border-green-200",

      pending: "bg-amber-100 text-amber-700 border-amber-200",

      rejected: "bg-red-100 text-red-700 border-red-200",

      not_uploaded: "bg-slate-100 text-slate-600 border-slate-200",
    };

    return (
      <div
        className="
        bg-white
        rounded-3xl
        border
        border-[#901E3E]/10
        p-5
        shadow-sm
      "
      >
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-[#511D43]">{title}</h4>

            <p className="text-sm text-slate-500 mt-1">
              {value || "Not Provided"}
            </p>
          </div>

          <span
            className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            border
            ${styles[status]}
          `}
          >
            {status?.replace("_", " ").toUpperCase()}
          </span>
        </div>

        {status === "rejected" && reason && (
          <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-200">
            <p className="text-xs font-bold text-red-700">REJECTION REASON</p>

            <p className="text-sm text-red-600 mt-1">{reason}</p>
          </div>
        )}
      </div>
    );
  };
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 -m-6 p-4 md:p-6">
        {/* Top Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Link
            to="/users"
            className="
              inline-flex items-center gap-2
              px-4 py-2
              bg-white
              border
              rounded-xl
              shadow-sm
              text-[#511D43]
              hover:bg-[#511D43]
              hover:text-white
              transition
            "
          >
            <ArrowLeft size={18} />
            Back to Users
          </Link>

          <Link
            to={`/users/edit/${user._id}`}
            className="
              inline-flex items-center gap-2
              px-4 py-2
              bg-[#901E3E]
              rounded-xl
              text-white
              hover:bg-[#511D43]
              transition
            "
          >
            <UserCog size={18} />
            Edit User
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#901E3E]/10">
          {/* Cover */}
          <div className="h-44 bg-gradient-to-r from-[#511D43] via-[#6d2458] to-[#901E3E]" />

          {/* Profile Content */}
          <div className="px-6 md:px-10 pb-10">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="-mt-16">
                {showAvatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="
      w-32 h-32 md:w-36 md:h-36
      rounded-full
      object-cover
      border-[6px]
      border-white
      shadow-2xl
    "
                  />
                ) : (
                  <div
                    className="
      w-32 h-32 md:w-36 md:h-36
      rounded-full
      border-[6px]
      border-white
      shadow-2xl
      bg-gradient-to-r
      from-[#511D43]
      via-[#6d2458]
      to-[#901E3E]
      flex
      items-center
      justify-center
      text-white
      text-5xl
      md:text-6xl
      font-bold
    "
                  >
                    {initials}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="text-center mt-5">
                <h1 className="text-3xl md:text-4xl font-bold text-[#511D43]">
                  {user.name}
                </h1>

                <p className="text-slate-500 mt-2 text-sm md:text-base">
                  {user.email}
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-[#511D43] to-[#901E3E] rounded-full mx-auto mt-4" />
                <div className="flex flex-wrap justify-center gap-2 mt-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      !user.isBlocked
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {!user.isBlocked ? "Active" : "Blocked"}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#901E3E]/10 text-[#901E3E] capitalize">
                    {user.role}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                    {user.subscription}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-10">
              <StatCard
                icon={<Mail size={18} />}
                label="Email"
                value={user.email}
              />

              <StatCard
                icon={<Phone size={18} />}
                label="Phone"
                value={user.phone || "-"}
              />

              <StatCard
                icon={<CreditCard size={18} />}
                label="Subscription"
                value={user.subscription}
              />

              <StatCard
                icon={<Calendar size={18} />}
                label="Joined"
                value={new Date(user.createdAt).toLocaleDateString()}
              />
            </div>

            {/* Information Cards */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-[#511D43] mb-5">
                User Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <Info label="Phone" value={user.phone} />

                <Info label="Address" value={user.address} />

                {/* <Info label="PAN Number" value={user.pan} /> */}

                {/* <Info label="Aadhaar Number" value={user.aadhaar} /> */}

                {/* <Info label="GSTIN" value={user.gstin} /> */}

                <Info label="Role" value={user.role} />

                <Info label="Subscription" value={user.subscription} />

                <Info
                  label="Subscription Expiry"
                  value={
                    user.subscriptionExpiry
                      ? new Date(user.subscriptionExpiry).toLocaleDateString()
                      : "-"
                  }
                />

                <Info
                  label="Joined Date"
                  value={new Date(user.createdAt).toLocaleDateString()}
                />
              </div>
            </div>
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="
        w-12
        h-12
        rounded-xl
        bg-gradient-to-r
        from-[#511D43]
        to-[#901E3E]
        text-white
        flex
        items-center
        justify-center
      "
                >
                  <CreditCard size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#511D43]">
                    KYC Information
                  </h2>

                  <p className="text-slate-500 text-sm">
                    User submitted KYC details
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <Info label="PAN Number" value={user.pan} />

                <Info label="Aadhaar Number" value={user.aadhaar} />

                <Info label="GSTIN" value={user.gstin} />
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#511D43] mb-5">
                KYC Verification
              </h2>

              <div className="grid md:grid-cols-3 gap-5">
                <KycAdminCard
                  title="PAN"
                  status={user.panStatus}
                  reason={user.panRejectReason}
                />

                <KycAdminCard
                  title="AADHAAR"
                  status={user.aadhaarStatus}
                  reason={user.aadhaarRejectReason}
                />

                <KycAdminCard
                  title="GSTIN"
                  status={user.gstinStatus}
                  reason={user.gstinRejectReason}
                />
              </div>
            </div>
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="
        w-12
        h-12
        rounded-xl
        bg-gradient-to-r
        from-[#511D43]
        to-[#901E3E]
        text-white
        flex
        items-center
        justify-center
      "
                >
                  <CreditCard size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#511D43]">
                    Uploaded Documents
                  </h2>

                  <p className="text-slate-500 text-sm">
                    Documents uploaded by the user
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {user?.documents?.map((doc) => (
                  <DocumentPreviewCard key={doc._id} doc={doc} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;

const StatCard = ({ icon, label, value }) => (
  <div className="bg-slate-50 rounded-2xl p-4 border">
    <div className="flex items-center gap-2 text-[#901E3E] mb-2">
      {icon}
      <span className="text-sm">{label}</span>
    </div>

    <p className="font-semibold truncate">{value || "-"}</p>
  </div>
);

const Info = ({ label, value }) => (
  <div className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transition">
    <p className="text-sm text-slate-500">{label}</p>

    <p className="font-semibold mt-2 break-words">{value || "-"}</p>
  </div>
);

const DocumentPreviewCard = ({ doc }) => {
  const isImage = doc?.mimeType?.startsWith("image/");

  const isPdf = doc?.mimeType === "application/pdf";

  return (
    <div
      className="
        bg-white
        border
        border-[#901E3E]/10
        rounded-3xl
        overflow-hidden
        shadow-sm
      "
    >
      <div className="h-52 bg-slate-100">
        {isImage ? (
          <img
            src={doc.fileUrl}
            alt={doc.fileName}
            className="
              w-full
              h-full
              object-cover
            "
          />
        ) : isPdf ? (
          <iframe
            src={doc.fileUrl}
            title={doc.fileName}
            className="
              w-full
              h-full
            "
          />
        ) : (
          <div
            className="
              h-full
              flex
              flex-col
              items-center
              justify-center
            "
          >
            <FileText size={50} className="text-[#901E3E]" />

            <p className="mt-2 text-sm text-slate-500">{doc.fileName}</p>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-[#511D43]">{doc.type}</h4>

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
              ${
                doc.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : doc.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
              }
            `}
          >
            {doc.status}
          </span>
        </div>

        <p className="text-sm text-slate-500 mt-2 truncate">{doc.fileName}</p>

        <div className="flex gap-2 mt-5">
          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-[#511D43]
              to-[#901E3E]
              text-white
              text-sm
              font-medium
            "
          >
            <Eye size={16} />
            View
          </a>

          <a
            href={doc.fileUrl}
            download
            className="
              w-11
              h-11
              rounded-xl
              border
              flex
              items-center
              justify-center
              hover:bg-slate-100
            "
          >
            <Download size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};
