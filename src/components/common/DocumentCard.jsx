import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Eye,
  Download,
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  FileText,
  BadgeCheck,
} from "lucide-react";

const DocumentCard = ({ doc, approve, reject }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [reason, setReason] = useState("");

  const isImage = doc?.mimeType?.startsWith("image/");
  const isPdf = doc?.mimeType === "application/pdf";

  const handleApprove = async () => {
    try {
      await approve(doc._id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async () => {
    if (!reason.trim()) {
      alert("Please enter rejection reason");
      return;
    }

    try {
      await reject({
        id: doc._id,
        reason,
      }).unwrap();

      setShowRejectModal(false);
      setReason("");
    } catch (error) {
      console.error(error);
    }
  };

  const statusStyles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",

    approved: "bg-green-100 text-green-700 border-green-200",

    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <>
      {" "}
      <div
        className="
       bg-white
       rounded-3xl
       overflow-hidden
       border
       border-[#901E3E]/10
       shadow-sm
       hover:shadow-xl
hover:-translate-y-1
group
       transition-all
       duration-300
     "
      >
        {/* Preview */}

        <div className="h-64 bg-slate-100 overflow-hidden">
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
            items-center
            justify-center
          "
            >
              <FileText size={60} className="text-[#901E3E]" />
            </div>
          )}
        </div>

        {/* Content */}

        <div className="p-5">
          {/* Header */}

          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-[#511D43]">
                  {doc.type.replaceAll("_", " ")}
                </h3>

                <span className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-[#901E3E]/10 text-[#901E3E]">
                  KYC
                </span>
              </div>

              <p className="text-sm font-medium mt-1">{doc.user?.name}</p>

              <p className="text-xs text-slate-500">{doc.user?.email}</p>
            </div>

            <span
              className={`
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
      border
      ${statusStyles[doc.status]}
    `}
            >
              {doc?.status?.toUpperCase() || "PENDING"}
            </span>
          </div>

          {/* Information */}

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Uploaded</span>

              <span>{new Date(doc.createdAt).toLocaleString()}</span>
            </div>

            {doc.reviewedAt && (
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Reviewed</span>

                <span>{new Date(doc.reviewedAt).toLocaleString()}</span>
              </div>
            )}

            {doc.reviewedBy?.name && (
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Reviewed By</span>

                <span>{doc.reviewedBy.name}</span>
              </div>
            )}
          </div>
          {/* Actions */}

          <div className="grid grid-cols-5 gap-2 mt-6">
            {/* View */}
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="
      h-11
      rounded-xl
      bg-[#511D43]
      text-white
      flex
      items-center
      justify-center
      hover:bg-[#901E3E]
      transition-all duration-300
    "
              title="View Document"
            >
              <Eye size={18} />
            </a>

            {/* Download */}
            <a
              href={doc.fileUrl}
              download
              className="
      h-11
      rounded-xl
      border
      border-slate-200
      flex
      items-center
      justify-center
      hover:bg-slate-100
      transition-all
    "
              title="Download Document"
            >
              <Download size={18} />
            </a>

            {/* User */}
            <Link
              to={`/users/${doc.user?._id}`}
              className="
      h-11
      rounded-xl
      bg-[#901E3E]/10
      text-[#901E3E]
      flex
      items-center
      justify-center
      hover:bg-[#901E3E]
      hover:text-white
      transition-all
    "
              title="User Profile"
            >
              <User size={18} />
            </Link>

            {/* Approve */}
            <button
              onClick={handleApprove}
              className={`
      h-11
      rounded-xl
      text-white
      flex
      items-center
      justify-center
      transition-all
      ${
        doc.status === "approved"
          ? "bg-green-700"
          : "bg-green-600 hover:bg-green-700"
      }
    `}
              title="Approve"
            >
              <CheckCircle2 size={18} />
            </button>

            {/* Reject */}
            <button
              onClick={() => setShowRejectModal(true)}
              className={`
      h-11
      rounded-xl
      text-white
      flex
      items-center
      justify-center
      transition-all
      ${
        doc.status === "rejected" ? "bg-red-700" : "bg-red-600 hover:bg-red-700"
      }
    `}
              title="Reject"
            >
              <XCircle size={18} />
            </button>
          </div>
        </div>
      </div>
      {/* Reject Modal */}
      {showRejectModal && (
        <div
          className="
        fixed
        inset-0
        bg-black/50
        z-50
        flex
        items-center
        justify-center
        p-4
      "
        >
          <div
            className="
          bg-white
          rounded-3xl
          w-full
          max-w-lg
          p-6
        "
          >
            <h3
              className="
            text-xl
            font-bold
            text-[#511D43]
          "
            >
              Reject Document
            </h3>

            <p className="text-slate-500 mt-2">Enter reason for rejection.</p>

            <textarea
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="
            w-full
            mt-5
            border
            rounded-2xl
            p-4
            focus:ring-2
            focus:ring-[#901E3E]
          "
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowRejectModal(false)}
                className="
              px-5
              py-3
              rounded-xl
              border
            "
              >
                Cancel
              </button>

              <button
                onClick={handleReject}
                className="
              px-5
              py-3
              rounded-xl
              bg-red-600
              text-white
            "
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const InfoRow = ({ icon, value }) => (
  <div className="flex items-center gap-3 text-sm text-slate-600">
    <span className="text-[#901E3E]">{icon}</span>

    <span className="truncate">{value || "-"}</span>
  </div>
);

export default DocumentCard;
