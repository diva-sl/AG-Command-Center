// import { useMemo, useState } from "react";

// import DashboardLayout from "../../components/layout/DashboardLayout";
// import {
//   Eye,
//   Download,
//   CheckCircle2,
//   XCircle,
//   Calendar,
//   User,
//   FileText,
// } from "lucide-react";

// import Loader from "../../components/common/Loader";
// import EmptyState from "../../components/common/EmptyState";
// import DocumentCard from "../../components/common/DocumentCard";

// import {
//   useGetDocumentsQuery,
//   useApproveDocumentMutation,
//   useRejectDocumentMutation,
// } from "../../redux/services/documentApi";

// const Documents = () => {
//   const { data = [], isLoading, isError } = useGetDocumentsQuery();

//   const [approve] = useApproveDocumentMutation();
//   const [reject] = useRejectDocumentMutation();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const filteredDocuments = useMemo(() => {
//     return data.filter((doc) => {
//       const matchesSearch =
//         doc?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         doc?.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         doc?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesStatus =
//         statusFilter === "all"
//           ? true
//           : doc?.status?.toLowerCase() === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }, [data, searchTerm, statusFilter]);

//   const stats = {
//     total: data.length,
//     approved: data.filter((d) => d.status?.toLowerCase() === "approved").length,
//     pending: data.filter((d) => d.status?.toLowerCase() === "pending").length,
//     rejected: data.filter((d) => d.status?.toLowerCase() === "rejected").length,
//   };

//   if (isLoading) {
//     return (
//       <DashboardLayout>
//         <Loader />
//       </DashboardLayout>
//     );
//   }

//   if (isError) {
//     return (
//       <DashboardLayout>
//         <EmptyState
//           title="Failed to Load Documents"
//           description="Something went wrong while fetching documents."
//         />
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div className="min-h-screen bg-slate-50 -m-6 p-6">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-[#511D43]">Documents</h1>

//             <p className="mt-2 text-slate-500">
//               Review, approve and manage uploaded client documents.
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl border border-[#901E3E]/10 px-6 py-4 shadow-sm">
//             <p className="text-sm text-slate-500">Total Documents</p>

//             <h2 className="text-2xl font-bold text-[#511D43]">{stats.total}</h2>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
//           <div className="bg-white rounded-2xl p-5 border shadow-sm">
//             <p className="text-sm text-slate-500">Total Uploads</p>

//             <h3 className="text-3xl font-bold text-[#511D43] mt-2">
//               {stats.total}
//             </h3>
//           </div>

//           <div className="bg-white rounded-2xl p-5 border shadow-sm">
//             <p className="text-sm text-slate-500">Approved</p>

//             <h3 className="text-3xl font-bold text-green-600 mt-2">
//               {stats.approved}
//             </h3>
//           </div>

//           <div className="bg-white rounded-2xl p-5 border shadow-sm">
//             <p className="text-sm text-slate-500">Pending Review</p>

//             <h3 className="text-3xl font-bold text-amber-500 mt-2">
//               {stats.pending}
//             </h3>
//           </div>

//           <div className="bg-white rounded-2xl p-5 border shadow-sm">
//             <p className="text-sm text-slate-500">Rejected</p>

//             <h3 className="text-3xl font-bold text-red-500 mt-2">
//               {stats.rejected}
//             </h3>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-2xl border shadow-sm p-4 mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             <input
//               type="text"
//               placeholder="Search documents..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="flex-1 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#901E3E]"
//             />

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#901E3E]"
//             >
//               <option value="all">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>

//         {/* Empty State */}
//         {filteredDocuments.length === 0 ? (
//           <EmptyState
//             title="No Documents Found"
//             description="No documents match your current filters."
//           />
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
//             {filteredDocuments.map((doc) => (
//               <DocumentCard
//                 key={doc._id}
//                 doc={doc}
//                 approve={approve}
//                 reject={reject}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Documents;
import { useMemo, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import DocumentCard from "../../components/common/DocumentCard";

import {
  FileText,
  Clock3,
  BadgeCheck,
  XCircle,
  Search,
  Upload,
} from "lucide-react";

import {
  useGetDocumentsQuery,
  useApproveDocumentMutation,
  useRejectDocumentMutation,
} from "../../redux/services/documentApi";

const Documents = () => {
  const { data = [], isLoading, isError } = useGetDocumentsQuery();

  const [approve] = useApproveDocumentMutation();
  const [reject] = useRejectDocumentMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredDocuments = useMemo(() => {
    return data
      .filter((doc) => {
        const matchesSearch =
          doc?.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "all" ? true : doc?.status === statusFilter;

        const matchesType =
          typeFilter === "all" ? true : doc?.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [data, searchTerm, statusFilter, typeFilter]);

  const latestUploads = [...data]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const stats = {
    total: data.length,
    pending: data.filter((d) => d.status === "pending").length,
    approved: data.filter((d) => d.status === "approved").length,
    rejected: data.filter((d) => d.status === "rejected").length,
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        {" "}
        <Loader />{" "}
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        {" "}
        <EmptyState
          title="Failed to Load Documents"
          description="Unable to fetch uploaded documents."
        />{" "}
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {" "}
      <div className="min-h-screen bg-slate-50 -m-6 p-4 md:p-6">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#511D43]">
            Documents Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Review, approve and manage KYC documents uploaded by users.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <StatCard
            icon={<FileText size={22} />}
            title="Total"
            value={stats.total}
            color="bg-[#511D43]"
          />

          <StatCard
            icon={<Clock3 size={22} />}
            title="Pending"
            value={stats.pending}
            color="bg-amber-500"
          />

          <StatCard
            icon={<BadgeCheck size={22} />}
            title="Approved"
            value={stats.approved}
            color="bg-green-600"
          />

          <StatCard
            icon={<XCircle size={22} />}
            title="Rejected"
            value={stats.rejected}
            color="bg-red-600"
          />
        </div>

        {/* Filters */}

        <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm p-5 mb-8">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
              />

              <input
                type="text"
                placeholder="Search document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
              w-full
              pl-11
              pr-4
              py-3
              border
              rounded-xl
              focus:ring-2
              focus:ring-[#901E3E]
            "
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
            border
            rounded-xl
            px-4
            py-3
            focus:ring-2
            focus:ring-[#901E3E]
          "
            >
              <option value="all">All Status</option>

              <option value="pending">Pending</option>

              <option value="approved">Approved</option>

              <option value="rejected">Rejected</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="
            border
            rounded-xl
            px-4
            py-3
            focus:ring-2
            focus:ring-[#901E3E]
          "
            >
              <option value="all">All Types</option>

              <option value="PAN_CARD">PAN Card</option>

              <option value="AADHAAR_CARD">Aadhaar Card</option>

              <option value="GST_CERTIFICATE">GST Certificate</option>

              <option value="ITR">ITR</option>

              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        {/* Latest Uploads */}

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Upload size={20} className="text-[#901E3E]" />

            <h2 className="text-xl font-bold text-[#511D43]">Latest Uploads</h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {latestUploads.map((doc) => (
              <div
                key={doc._id}
                className="
              bg-white
              rounded-2xl
              border
              border-[#901E3E]/10
              p-5
              hover:shadow-lg
              transition
            "
              >
                <h4 className="font-semibold text-[#511D43]">
                  {doc.type.replaceAll("_", " ")}
                </h4>

                <p className="mt-2 text-sm font-medium">{doc.user?.name}</p>

                <p className="text-xs text-slate-500">{doc.user?.email}</p>

                <p className="text-xs text-slate-400 mt-3">
                  Uploaded: {new Date(doc.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}

        <div>
          <h2 className="text-xl font-bold text-[#511D43] mb-5">
            All Documents
          </h2>

          {filteredDocuments.length === 0 ? (
            <EmptyState
              title="No Documents Found"
              description="No documents match your filters."
            />
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <DocumentCard
                  key={doc._id}
                  doc={doc}
                  approve={approve}
                  reject={reject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div
    className="
      bg-white
      rounded-3xl
      p-5
      border
      border-[#901E3E]/10
      shadow-sm
    "
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm">{title}</p>

        <h3 className="text-3xl font-bold mt-2">{value}</h3>
      </div>

      <div
        className={`
      w-14
      h-14
      rounded-2xl
      text-white
      flex
      items-center
      justify-center
      ${color}
    `}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default Documents;
