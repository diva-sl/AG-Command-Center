import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  CreditCard,
  ShieldCheck,
  FileCheck,
  Eye,
  Download,
  BadgeCheck,
  XCircle,
  Clock3,
  ArrowLeft,
  Shield,
  UserCog,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";

import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/services/userApi";
import { useGetPlansQuery } from "../../redux/services/planApi";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetUserByIdQuery(id);

  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const { data: plans = [] } = useGetPlansQuery();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pan: "",
    aadhaar: "",
    gstin: "",
    role: "user",
    subscription: "none",
    subscriptionExpiry: "",
    isBlocked: false,
    panStatus: "",
    panRejectReason: "",

    aadhaarStatus: "",
    aadhaarRejectReason: "",

    gstinStatus: "",
    gstinRejectReason: "",
  });

  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        pan: user.pan || "",
        aadhaar: user.aadhaar || "",
        gstin: user.gstin || "",
        role: user.role || "user",
        subscription: user.subscription || "none",
        subscriptionExpiry: user.subscriptionExpiry
          ? user.subscriptionExpiry.split("T")[0]
          : "",
        isBlocked: user.isBlocked || false,
        panStatus: user.panStatus || "not_uploaded",
        panRejectReason: user.panRejectReason || "",

        aadhaarStatus: user.aadhaarStatus || "not_uploaded",
        aadhaarRejectReason: user.aadhaarRejectReason || "",

        gstinStatus: user.gstinStatus || "not_uploaded",
        gstinRejectReason: user.gstinRejectReason || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name === "subscription") {
      const plan = plans.find((p) => p.name === value);
      setSelectedPlan(plan || null);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser({
        id,
        ...formData,
      }).unwrap();

      alert("User updated successfully");

      navigate(`/users/${id}`);
    } catch (error) {
      alert(error?.data?.message || "Failed to update user");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 -m-6 p-4 md:p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/users"
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              border
              bg-white
              text-[#511D43]
              hover:bg-[#511D43]
              hover:text-white
              transition
              shadow-sm
            "
          >
            <ArrowLeft size={18} />
            Back to Users
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Header */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#901E3E]/10 mb-8">
            <div className="h-36 bg-gradient-to-r from-[#511D43] via-[#6d2458] to-[#901E3E]" />

            <div className="px-6 md:px-8 pb-8">
              <div className="flex flex-col lg:flex-row gap-6 lg:items-end -mt-16">
                <div className="flex justify-center">
                  <div
                    className="
    w-32 h-32
    rounded-full
    border-4
    border-white
    shadow-xl
    overflow-hidden
    bg-white
  "
                  >
                    {user?.avatar &&
                    !user?.avatar?.includes("googleusercontent.com") ? (
                      <img
                        src={user.avatar}
                        alt={formData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="
        w-full
        h-full
        flex
        items-center
        justify-center
        text-white
        text-4xl
        font-bold
        bg-gradient-to-r
        from-[#511D43]
        via-[#6d2458]
        to-[#901E3E]
      "
                      >
                        {formData.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-3xl font-bold text-[#511D43]">
                    Edit User
                  </h1>

                  <p className="text-slate-500 mt-2">
                    Update user profile, permissions and subscription details.
                  </p>
                </div>

                <div
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${
                    formData.isBlocked
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {formData.isBlocked ? "Blocked" : "Active"}
                </div>
              </div>
            </div>
          </div>
          {/* Personal Information */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#901E3E]/10 mb-6">
            <h2 className="text-xl font-semibold text-[#511D43] mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* KYC Information */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#901E3E]/10 mb-6">
            <div className="flex items-center gap-3 mb-6">
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
                <BadgeCheck size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#511D43]">
                  KYC Details
                </h2>

                <p className="text-slate-500 text-sm">
                  Update PAN, Aadhaar and GST information.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <Input
                icon={<CreditCard size={18} />}
                label="PAN Number"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
              />

              <Input
                icon={<ShieldCheck size={18} />}
                label="Aadhaar Number"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
              />

              <Input
                icon={<FileCheck size={18} />}
                label="GSTIN"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#901E3E]/10 mb-6">
            <h2 className="text-xl font-semibold text-[#511D43] mb-6">
              KYC Review Status
            </h2>

            <div className="grid lg:grid-cols-3 gap-5">
              <AdminKycReviewCard
                title="PAN Card"
                icon={<CreditCard size={20} />}
                status={formData.panStatus}
                reason={formData.panRejectReason}
                document={user?.documents?.find((d) => d.type === "PAN_CARD")}
              />

              <AdminKycReviewCard
                title="Aadhaar Card"
                icon={<ShieldCheck size={20} />}
                status={formData.aadhaarStatus}
                reason={formData.aadhaarRejectReason}
                document={user?.documents?.find(
                  (d) => d.type === "AADHAAR_CARD",
                )}
              />

              <AdminKycReviewCard
                title="GST Certificate"
                icon={<FileCheck size={20} />}
                status={formData.gstinStatus}
                reason={formData.gstinRejectReason}
                document={user?.documents?.find(
                  (d) => d.type === "GST_CERTIFICATE",
                )}
              />
            </div>
          </div>
          {/* Account Settings */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#901E3E]/10">
            <h2 className="text-xl font-semibold text-[#511D43] mb-6">
              Account Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="user">User</option>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {selectedPlan && (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-700">Plan Details</h4>

                  <p>Price: ₹{selectedPlan.price}</p>

                  {selectedPlan.originalPrice && (
                    <p>MRP: ₹{selectedPlan.originalPrice}</p>
                  )}

                  <p>Category: {selectedPlan.category}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subscription
                </label>

                {/* <select
                  name="subscription"
                  value={formData.subscription}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  {/* <option value="none">None</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="corporate">Corporate</option> 
                </select> */}

                <select
                  name="subscription"
                  value={formData.subscription}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="none">No Subscription</option>

                  {plans.map((plan) => (
                    <option key={plan._id} value={plan.name}>
                      {plan.name} - ₹{plan.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Subscription Expiry"
                name="subscriptionExpiry"
                type="date"
                value={formData.subscriptionExpiry}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isBlocked"
                  checked={formData.isBlocked}
                  onChange={handleChange}
                />

                <span className="font-medium">Block this user</span>
              </label>
            </div>
          </div>
          {/* Footer Actions */}
          <div className="mt-8">
            <div
              className="
      bg-white
      rounded-3xl
      border
      border-[#901E3E]/10
      shadow-sm
      p-5
      flex
      flex-col
      sm:flex-row
      gap-3
      justify-end
    "
            >
              <Link
                to={`/users/${id}`}
                className="
    px-6
    py-3
    rounded-xl
    border
    border-slate-300
    text-slate-700
    font-medium
    text-center
    hover:bg-slate-100
    transition
  "
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={updating}
                className="
    px-6
    py-3
    rounded-xl
    bg-gradient-to-r
    from-[#511D43]
    via-[#6d2458]
    to-[#901E3E]
    text-white
    font-medium
    hover:shadow-lg
    transition
    disabled:opacity-50
  "
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditUser;

const Input = ({ icon, label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-slate-700">
      {icon}
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="
        w-full
        border
        border-slate-300
        rounded-xl
        px-4
        py-3
        focus:outline-none
        focus:ring-2
        focus:ring-[#901E3E]
        focus:border-[#901E3E]
      "
    />
  </div>
);

const AdminKycReviewCard = ({ title, icon, status, reason, document }) => {
  const statusConfig = {
    approved: {
      color: "bg-green-100 text-green-700",
      icon: <BadgeCheck size={14} />,
      label: "Approved",
    },

    rejected: {
      color: "bg-red-100 text-red-700",
      icon: <XCircle size={14} />,
      label: "Rejected",
    },

    pending: {
      color: "bg-amber-100 text-amber-700",
      icon: <Clock3 size={14} />,
      label: "Pending",
    },

    not_uploaded: {
      color: "bg-slate-100 text-slate-600",
      icon: <Clock3 size={14} />,
      label: "Not Uploaded",
    },
  };

  const current = statusConfig[status] || statusConfig.not_uploaded;

  return (
    <div
      className="
        border
        border-[#901E3E]/10
        rounded-3xl
        p-5
        bg-white
      "
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
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
            {icon}
          </div>

          <h4 className="font-semibold text-[#511D43]">{title}</h4>
        </div>

        <span
          className={`
            flex
            items-center
            gap-1
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            ${current.color}
          `}
        >
          {current.icon}
          {current.label}
        </span>
      </div>

      {document?.fileUrl && (
        <div className="flex gap-2 mt-5">
          <a
            href={document.fileUrl}
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
            href={document.fileUrl}
            download
            className="
              w-11
              h-11
              rounded-xl
              border
              flex
              items-center
              justify-center
              hover:bg-slate-50
            "
          >
            <Download size={16} />
          </a>
        </div>
      )}

      {reason && (
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100">
          <p className="text-xs font-semibold text-red-700">Rejection Reason</p>

          <p className="text-sm text-red-600 mt-1">{reason}</p>
        </div>
      )}
    </div>
  );
};
