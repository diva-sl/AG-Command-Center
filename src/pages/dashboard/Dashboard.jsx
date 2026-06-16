import DashboardLayout from "../../components/layout/DashboardLayout";
import RevenueChart from "../../components/charts/RevenueChart";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import { Users, CreditCard, FileText, IndianRupee } from "lucide-react";

import {
  useGetDashboardQuery,
  useRecentUsersQuery,
  useRecentTransactionsQuery,
} from "../../redux/services/dashboardApi";

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardQuery();

  const { data: recentUsers = [] } = useRecentUsersQuery();

  const { data: recentTransactions = [] } = useRecentTransactionsQuery();

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: "Users",
      value: data?.stats?.users || 0,
      icon: Users,
    },
    {
      title: "Transactions",
      value: data?.stats?.transactions || 0,
      icon: CreditCard,
    },
    {
      title: "Documents",
      value: data?.stats?.documents || 0,
      icon: FileText,
    },
    {
      title: "Revenue",
      value: `₹${data?.stats?.revenue || 0}`,
      icon: IndianRupee,
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#511D43]">
          Executive Dashboard
        </h1>

        <p className="text-slate-500 mt-2">AG & Associates Command Center</p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
    bg-white
    rounded-3xl
    p-6
    border
    border-[#511D43]/10
    shadow-lg
    hover:shadow-2xl
    hover:-translate-y-1
    transition-all
    duration-300
  "
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500">{item.title}</p>

                  <h2 className="text-4xl font-bold mt-3 text-[#511D43]">
                    {item.value}
                  </h2>
                </div>

                <div
                  className="
    w-14
    h-14
    rounded-2xl
    bg-gradient-to-br
    from-[#511D43]
    to-[#901E3E]
    text-white
    flex
    items-center
    justify-center
    shadow-lg
  "
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue */}

      <div className="mt-8">
        <RevenueChart data={data?.revenue || []} />
      </div>

      {/* Recent */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div
          className="
    bg-white
    p-6
    rounded-3xl
    border
    border-[#511D43]/10
    shadow-lg
  "
        >
          <h2 className="font-bold mb-4">Recent Users</h2>

          {recentUsers.map((user) => (
            <div
              key={user._id}
              className="
    flex
    justify-between
    py-4
    border-b
    border-slate-100
  "
            >
              <span>{user.name}</span>
              <span className="text-slate-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>

        <div
          className="
    bg-white
    p-6
    rounded-3xl
    border
    border-[#511D43]/10
    shadow-lg
  "
        >
          <h2 className="font-bold mb-4">Recent Transactions</h2>

          {recentTransactions.map((txn) => (
            <div key={txn._id} className="flex justify-between py-2">
              <span>{txn.user?.name}</span>

              <span className="font-bold text-[#901E3E]">₹{txn.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
