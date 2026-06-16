import { useMemo, useState } from "react";

import { CSVLink } from "react-csv";

import DashboardLayout from "../../components/layout/DashboardLayout";

import DataTable from "../../components/common/DataTable";

import SearchInput from "../../components/common/SearchInput";

import Loader from "../../components/common/Loader";

import { useGetTransactionsQuery } from "../../redux/services/transactionApi";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const Transactions = () => {
  const { data = [], isLoading } = useGetTransactionsQuery();

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data
      .filter((txn) => txn.status === "paid")
      .filter(
        (txn) =>
          txn.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
          txn.planName?.toLowerCase().includes(search.toLowerCase()),
      );
  }, [data, search]);

  const columns = [
    {
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-[#511D43]">
            {row.original.user?.name}
          </p>

          <p className="text-xs text-slate-500">{row.original.user?.email}</p>
        </div>
      ),
    },

    {
      header: "Plan",

      cell: ({ row }) => (
        <span className="capitalize">{row.original.planName}</span>
      ),
    },

    {
      header: "Amount",

      cell: ({ row }) => (
        <span className="font-bold text-green-600 text-base">
          ₹{row.original.amount}
        </span>
      ),
    },

    {
      header: "Status",

      cell: () => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Paid
        </span>
      ),
    },

    {
      header: "Date",

      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },

    {
      header: "Actions",

      cell: ({ row }) => (
        <Link
          to={`/transactions/${row.original._id}`}
          className="
          inline-flex
          items-center
          justify-center
          p-2
          rounded-xl
          bg-[#511D43]
          hover:bg-[#901E3E]
          text-white
          transition
        "
        >
          <Eye size={18} />
        </Link>
      ),
    },
  ];

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
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#511D43]">Transactions</h1>

            <p className="text-slate-500 mt-2">
              Track subscription payments and revenue.
            </p>
          </div>

          <CSVLink
            data={filteredData}
            filename="transactions.csv"
            className="
            bg-[#901E3E]
            hover:bg-[#511D43]
            text-white
            px-5
            py-3
            rounded-xl
            transition
          "
          >
            Export CSV
          </CSVLink>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <p className="text-sm text-slate-500">Total Transactions</p>

            <h2 className="text-3xl font-bold text-[#511D43] mt-2">
              {filteredData.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <p className="text-sm text-slate-500">Revenue</p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              ₹{filteredData.reduce((sum, txn) => sum + txn.amount, 0)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <p className="text-sm text-slate-500">Paid Orders</p>

            <h2 className="text-3xl font-bold text-[#901E3E] mt-2">
              {filteredData.length}
            </h2>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#901E3E]/10">
          <div className="mb-6">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <DataTable columns={columns} data={filteredData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
