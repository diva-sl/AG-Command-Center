import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, UserCog } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";

import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/services/userApi";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetUserByIdQuery(id);

  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

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
  });

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
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

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
            <h2 className="text-xl font-semibold text-[#511D43] mb-6">
              KYC Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <Input
                label="PAN Number"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
              />

              <Input
                label="Aadhaar Number"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
              />

              <Input
                label="GSTIN"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
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

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subscription
                </label>

                <select
                  name="subscription"
                  value={formData.subscription}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="none">None</option>
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="corporate">Corporate</option>
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

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        focus:outline-none
        focus:ring-2
        focus:ring-[#901E3E]
      "
    />
  </div>
);

export default EditUser;
