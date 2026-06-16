import { useMemo, useState } from "react";
import { CSVLink } from "react-csv";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DataTable from "../../components/common/DataTable";
import SearchInput from "../../components/common/SearchInput";
import Loader from "../../components/common/Loader";

import {
  useGetUsersQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
} from "../../redux/services/userApi";

import { Link } from "react-router-dom";
import { ShieldBan, ShieldCheck, Trash2, Eye, Pencil } from "lucide-react";

const Users = () => {
  const { data = [], isLoading } = useGetUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return data.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },

    {
      header: "Email",
      accessorKey: "email",
    },

    {
      header: "Role",

      cell: ({ row }) => (
        <span className="capitalize font-medium text-[#511D43]">
          {row.original.role}
        </span>
      ),
    },

    {
      header: "Subscription",

      cell: ({ row }) => (
        <span className="capitalize">{row.original.subscription}</span>
      ),
    },

    {
      header: "Status",

      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            !row.original.isBlocked
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {!row.original.isBlocked ? "Active" : "Blocked"}
        </span>
      ),
    },

    {
      header: "Joined",

      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },

    {
      header: "Actions",

      cell: ({ row }) => (
        <div
          className="
      flex
      items-center
      gap-2
     bg-white shadow-sm border border-[#901E3E]/10
      px-3
      py-2
      rounded-2xl
      w-fit
    "
        >
          <Link
            to={`/users/${row.original._id}`}
            className="
        p-2
        rounded-xl
        bg-[#511D43]/10
        text-[#511D43]
        hover:bg-[#511D43]
        hover:text-white
        transition-all
      "
          >
            <Eye size={17} />
          </Link>

          <Link
            to={`/users/edit/${row.original._id}`}
            className="
        p-2
        rounded-xl
        bg-slate-100
        text-slate-700
        hover:bg-slate-800
        hover:text-white
        transition-all
      "
          >
            <Pencil size={17} />
          </Link>

          <button
            onClick={() => blockUser(row.original._id)}
            className={`
        p-2
        rounded-xl
        transition-all
        ${
          row.original.isBlocked
            ? `
              bg-emerald-50
              text-emerald-600
              hover:bg-emerald-600
              hover:text-white
            `
            : `
              bg-amber-50
              text-amber-600
              hover:bg-amber-500
              hover:text-white
            `
        }
      `}
          >
            {row.original.isBlocked ? (
              <ShieldCheck size={17} />
            ) : (
              <ShieldBan size={17} />
            )}
          </button>

          <button
            onClick={() => {
              if (window.confirm("Delete this user?")) {
                deleteUser(row.original._id);
              }
            }}
            className="
        p-2
        rounded-xl
        bg-red-50
        text-red-600
        hover:bg-red-600
        hover:text-white
        transition-all
      "
          >
            <Trash2 size={17} />
          </button>
        </div>
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
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <CSVLink
            data={filteredUsers}
            filename="users.csv"
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

        <DataTable columns={columns} data={filteredUsers} />
      </div>
    </DashboardLayout>
  );
};

export default Users;
