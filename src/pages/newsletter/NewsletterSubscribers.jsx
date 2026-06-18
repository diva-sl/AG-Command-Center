import { useMemo, useState } from "react";

import { Mail, Users, Trash2, Search, UserCheck, UserX } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  useGetSubscribersQuery,
  useGetNewsletterStatsQuery,
  useDeleteSubscriberMutation,
} from "../../redux/services/newsletterApi";

const NewsletterSubscribers = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetSubscribersQuery();

  const { data: statsData } = useGetNewsletterStatsQuery();

  const [deleteSubscriber] = useDeleteSubscriberMutation();

  const subscribers = data?.data || [];

  const stats = statsData?.data || {};

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((item) =>
      item.email?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [subscribers, search]);

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this subscriber?",
    );

    if (!confirmDelete) return;

    try {
      await deleteSubscriber(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      {" "}
      <div className="min-h-screen bg-slate-50 -m-6 p-4 md:p-6">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#511D43]">
            Newsletter Subscribers
          </h1>

          <p className="text-slate-500 mt-2">
            Manage newsletter subscriptions, tax alerts and compliance update
            subscribers.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          <StatCard
            title="Total Subscribers"
            value={stats.totalSubscribers || 0}
            icon={<Users size={22} />}
          />

          <StatCard
            title="Active Subscribers"
            value={stats.activeSubscribers || 0}
            icon={<UserCheck size={22} />}
          />

          <StatCard
            title="Unsubscribed"
            value={stats.unsubscribed || 0}
            icon={<UserX size={22} />}
          />
        </div>

        {/* Search */}

        <div className="bg-white rounded-3xl border p-5 mb-6 shadow-sm">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search subscriber email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
            w-full
            pl-11
            pr-4
            py-3

            rounded-xl
            border

            focus:outline-none
            focus:ring-2
            focus:ring-[#901E3E]/20
          "
            />
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl border overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="p-12 text-center">Loading subscribers...</div>
          ) : filteredSubscribers.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 border-b">
                      <th className="p-4 text-left">Email Address</th>

                      <th className="p-4 text-left">Status</th>

                      <th className="p-4 text-left">Source</th>

                      <th className="p-4 text-left">Subscribed On</th>

                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSubscribers.map((subscriber) => (
                      <tr
                        key={subscriber._id}
                        className="border-b hover:bg-slate-50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="
                              w-10
                              h-10

                              rounded-xl

                              bg-gradient-to-r
                              from-[#511D43]
                              to-[#901E3E]

                              flex
                              items-center
                              justify-center
                            "
                            >
                              <Mail size={16} className="text-white" />
                            </div>

                            <span className="font-medium">
                              {subscriber.email}
                            </span>
                          </div>
                        </td>

                        <td className="p-4">
                          <span
                            className={`
                            px-3
                            py-1

                            rounded-full

                            text-xs
                            font-semibold

                            ${
                              subscriber.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                          >
                            {subscriber.status}
                          </span>
                        </td>

                        <td className="p-4 capitalize">
                          {subscriber.source || "website"}
                        </td>

                        <td className="p-4">
                          {new Date(subscriber.createdAt).toLocaleDateString()}
                        </td>

                        <td className="p-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => deleteHandler(subscriber._id)}
                              className="
                              p-2

                              rounded-xl

                              text-red-600

                              hover:bg-red-50

                              transition
                            "
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="p-12 text-center">
              <h3 className="font-bold text-xl text-[#511D43]">
                No Subscribers Found
              </h3>

              <p className="text-slate-500 mt-2">
                Newsletter subscribers will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-3xl border p-6 shadow-sm hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm">{title}</p>

        <h3 className="text-3xl font-bold text-[#511D43] mt-2">{value}</h3>
      </div>

      <div
        className="
      w-12
      h-12

      rounded-2xl

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
    </div>
  </div>
);

export default NewsletterSubscribers;
