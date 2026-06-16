const DocumentCard = ({ doc, approve, reject }) => {
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-700",

    approved: "bg-green-100 text-green-700",

    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{doc.type}</h3>

          <p className="text-slate-500 text-sm mt-1">{doc.user?.name}</p>

          <p className="text-slate-400 text-xs">{doc.user?.email}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusClasses[doc.status]
          }`}
        >
          {doc.status}
        </span>
      </div>

      <div className="mt-5 flex gap-2 flex-wrap">
        <a
          href={doc.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
        >
          View
        </a>

        {doc.status !== "approved" && (
          <button
            onClick={() => approve(doc._id)}
            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm"
          >
            Approve
          </button>
        )}

        {doc.status !== "rejected" && (
          <button
            onClick={() => reject(doc._id)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm"
          >
            Reject
          </button>
        )}
      </div>

      <div className="mt-4 text-xs text-slate-400">
        Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default DocumentCard;
