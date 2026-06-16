import { useEffect, useState } from "react";

import MDEditor from "@uiw/react-md-editor";

import {
  useGetLegalPageQuery,
  useUpdateLegalPageMutation,
} from "../../redux/services/settingsApi";

const legalPages = [
  {
    value: "privacy",
    label: "Privacy Policy",
  },
  {
    value: "terms",
    label: "Terms & Conditions",
  },
  {
    value: "disclaimer",
    label: "Disclaimer",
  },
  {
    value: "refund",
    label: "Refund Policy",
  },
  {
    value: "cancellation",
    label: "Cancellation Policy",
  },
];

const LegalSettings = () => {
  const [page, setPage] = useState("privacy");

  const { data } = useGetLegalPageQuery(page);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [saveLegalPage, { isLoading }] = useUpdateLegalPageMutation();

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setContent(data.content || "");
    }
  }, [data]);

  useEffect(() => {
    setTitle("");
    setContent("");
  }, [page]);

  const saveHandler = async () => {
    try {
      await saveLegalPage({
        page,
        title,
        content,
      }).unwrap();

      alert("Legal page saved successfully");
    } catch (error) {
      console.log(error);

      alert(error?.data?.message || "Failed to save legal page");
    }
  };

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Legal Pages Management
        </h2>

        <p className="text-slate-500 mt-1">
          Manage Privacy Policy, Terms & Conditions, Disclaimer and other legal
          pages.
        </p>
      </div>

      {/* Page Selector */}

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Legal Page</label>

        <select
          value={page}
          onChange={(e) => setPage(e.target.value)}
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#511D43]"
        >
          {legalPages.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Page Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter page title"
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#511D43]"
        />
      </div>

      {/* Markdown Editor */}

      <div className="mb-6" data-color-mode="light">
        <label className="block text-sm font-semibold mb-3">Content</label>

        <MDEditor
          value={content}
          onChange={(value) => setContent(value || "")}
          height={500}
          preview="edit"
        />
      </div>

      {/* Actions */}

      <div className="flex justify-end">
        <button
          onClick={saveHandler}
          disabled={isLoading}
          className="bg-[#511D43] hover:bg-[#652757] text-white px-8 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Legal Page"}
        </button>
      </div>
    </div>
  );
};

export default LegalSettings;
