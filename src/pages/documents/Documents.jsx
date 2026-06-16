import { useMemo, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import DocumentCard from "../../components/common/DocumentCard";

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

  const filteredDocuments = useMemo(() => {
    return data.filter((doc) => {
      const matchesSearch =
        doc?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc?.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : doc?.status?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  const stats = {
    total: data.length,
    approved: data.filter((d) => d.status?.toLowerCase() === "approved").length,
    pending: data.filter((d) => d.status?.toLowerCase() === "pending").length,
    rejected: data.filter((d) => d.status?.toLowerCase() === "rejected").length,
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <EmptyState
          title="Failed to Load Documents"
          description="Something went wrong while fetching documents."
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 -m-6 p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#511D43]">Documents</h1>

            <p className="mt-2 text-slate-500">
              Review, approve and manage uploaded client documents.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#901E3E]/10 px-6 py-4 shadow-sm">
            <p className="text-sm text-slate-500">Total Documents</p>

            <h2 className="text-2xl font-bold text-[#511D43]">{stats.total}</h2>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Total Uploads</p>

            <h3 className="text-3xl font-bold text-[#511D43] mt-2">
              {stats.total}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Approved</p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {stats.approved}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Pending Review</p>

            <h3 className="text-3xl font-bold text-amber-500 mt-2">
              {stats.pending}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Rejected</p>

            <h3 className="text-3xl font-bold text-red-500 mt-2">
              {stats.rejected}
            </h3>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#901E3E]"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#901E3E]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 ? (
          <EmptyState
            title="No Documents Found"
            description="No documents match your current filters."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
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
    </DashboardLayout>
  );
};

export default Documents;
