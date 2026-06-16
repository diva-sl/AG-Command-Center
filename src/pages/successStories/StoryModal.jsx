import { useEffect, useState } from "react";

import {
  X,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

import {
  useCreateStoryMutation,
  useUpdateStoryMutation,
  useUploadStoryAssetsMutation,
} from "../../redux/services/successStoryApi";

const initialState = {
  title: "",
  category: "Tax Planning",
  industry: "",
  location: "",
  companySize: "",
  services: "",

  challenge: "",
  solution: "",
  implementation: "",
  outcome: "",

  featured: false,
  status: "draft",

  coverImage: "",
  coverImagePublicId: "",

  pdfUrl: "",
  pdfPublicId: "",

  testimonialName: "",
  testimonialDesignation: "",
  testimonialCompany: "",
  testimonialQuote: "",

  metrics: [
    {
      label: "",
      value: "",
    },
  ],
};

const StoryModal = ({ open, onClose, story }) => {
  const [createStory] = useCreateStoryMutation();

  const [updateStory] = useUpdateStoryMutation();

  const [uploadAssets] = useUploadStoryAssetsMutation();

  const [saving, setSaving] = useState(false);

  const [coverImage, setCoverImage] = useState(null);

  const [pdfFile, setPdfFile] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  //   const [form, setForm] = useState(initialState);
  const [form, setForm] = useState({
    ...initialState,
    coverImage: "",
    coverImagePublicId: "",
    pdfUrl: "",
    pdfPublicId: "",
  });

  /* ================= BODY SCROLL LOCK ================= */

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  /* ================= EDIT MODE ================= */

  useEffect(() => {
    if (story) {
      setForm({
        title: story.title || "",

        category: story.category || "Tax Planning",

        industry: story.industry || "",

        location: story.location || "",

        companySize: story.companySize || "",

        services: story.services || "",

        challenge: story.challenge || "",

        solution: story.solution || "",

        implementation: story.implementation || "",

        outcome: story.outcome || "",

        featured: story.featured || false,

        status: story.status || "draft",

        coverImage: story.coverImage || "",
        coverImagePublicId: story.coverImagePublicId || "",

        pdfUrl: story.pdfUrl || "",
        pdfPublicId: story.pdfPublicId || "",

        testimonialName: story.testimonial?.name || "",

        testimonialDesignation: story.testimonial?.designation || "",

        testimonialCompany: story.testimonial?.company || "",

        testimonialQuote: story.testimonial?.quote || "",

        metrics: story.metrics?.length
          ? story.metrics
          : [
              {
                label: "",
                value: "",
              },
            ],
      });

      setImagePreview(story.coverImage || "");
    } else {
      setForm({
        ...initialState,
        coverImage: "",
        coverImagePublicId: "",
        pdfUrl: "",
        pdfPublicId: "",
      });
      setImagePreview("");

      setCoverImage(null);

      setPdfFile(null);
    }
  }, [story, open]);

  /* ================= IMAGE PREVIEW ================= */

  useEffect(() => {
    if (!coverImage) return;

    const objectUrl = URL.createObjectURL(coverImage);

    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [coverImage]);

  /* ================= HELPERS ================= */

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addMetric = () => {
    setForm((prev) => ({
      ...prev,
      metrics: [
        ...prev.metrics,
        {
          label: "",
          value: "",
        },
      ],
    }));
  };

  const removeMetric = (index) => {
    const updated = [...form.metrics];

    updated.splice(index, 1);

    setForm({
      ...form,
      metrics:
        updated.length > 0
          ? updated
          : [
              {
                label: "",
                value: "",
              },
            ],
    });
  };

  const metricChange = (index, field, value) => {
    const updated = [...form.metrics];

    updated[index][field] = value;

    setForm({
      ...form,
      metrics: updated,
    });
  };

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    if (!form.title.trim()) {
      alert("Story title is required");
      return false;
    }

    if (!form.category.trim()) {
      alert("Category is required");
      return false;
    }

    if (!form.challenge.trim()) {
      alert("Challenge section is required");
      return false;
    }

    if (!form.solution.trim()) {
      alert("Solution section is required");
      return false;
    }

    if (!form.outcome.trim()) {
      alert("Outcome section is required");
      return false;
    }

    return true;
  };

  /* ================= SUBMIT ================= */

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);

      let imageUrl = form.coverImage;

      let pdfUrl = form.pdfUrl;

      let coverImagePublicId = form.coverImagePublicId || "";

      let pdfPublicId = form.pdfPublicId || "";

      if (coverImage || pdfFile) {
        const uploadForm = new FormData();

        if (coverImage) {
          uploadForm.append("coverImage", coverImage);
        }

        if (pdfFile) {
          uploadForm.append("pdf", pdfFile);
        }

        const uploaded = await uploadAssets(uploadForm).unwrap();

        imageUrl = uploaded.coverImage || imageUrl;

        pdfUrl = uploaded.pdfUrl || pdfUrl;

        coverImagePublicId = uploaded.coverImagePublicId || coverImagePublicId;

        pdfPublicId = uploaded.pdfPublicId || pdfPublicId;
      }

      const payload = {
        title: form.title,
        category: form.category,
        industry: form.industry,
        location: form.location,
        companySize: form.companySize,
        services: form.services,

        challenge: form.challenge,
        solution: form.solution,
        implementation: form.implementation,
        outcome: form.outcome,

        featured: form.featured,
        status: form.status,

        coverImage: imageUrl,
        coverImagePublicId,

        pdfUrl,
        pdfPublicId,

        metrics: form.metrics.filter((m) => m.label || m.value),

        testimonial: {
          name: form.testimonialName,
          designation: form.testimonialDesignation,
          company: form.testimonialCompany,
          quote: form.testimonialQuote,
        },
      };
      if (story) {
        await updateStory({
          id: story._id,
          ...payload,
        }).unwrap();
      } else {
        await createStory(payload).unwrap();
      }

      onClose();
    } catch (error) {
      console.log(error);

      alert(error?.data?.message || "Failed to save story");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  const inputStyle = `
w-full
border
border-slate-300
rounded-xl
px-4
py-3
bg-white
focus:outline-none
focus:ring-2
focus:ring-[#901E3E]
focus:border-transparent
transition
`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 md:p-4">
      <div
        className="
        bg-white
        w-full
        max-w-7xl
        h-[96vh]
        rounded-3xl
        shadow-2xl
        overflow-hidden
        flex
        flex-col
      "
      >
        {/* HEADER */}

        <div className="bg-gradient-to-r from-[#511D43] via-[#6c2858] to-[#901E3E] px-5 md:px-8 py-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {story ? "Edit Success Story" : "Create Success Story"}
              </h2>

              <p className="text-white/80 mt-1 text-sm">
                AG Associates Success Story Management
              </p>
            </div>

            <button
              onClick={onClose}
              className="
              w-11 h-11
              rounded-xl
              bg-white/10
              hover:bg-white/20
              transition
              flex
              items-center
              justify-center
            "
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* FORM */}

        <form
          onSubmit={submitHandler}
          className="
          flex-1
          overflow-y-auto
          p-4 md:p-8
          bg-slate-50
          space-y-6
        "
        >
          {/* BASIC INFO */}

          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#511D43] mb-5">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Story Title"
                className="input"
              />

              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="input"
              >
                <option>Tax Planning</option>
                <option>Income Tax Filing</option>
                <option>GST Services</option>
                <option>Business Registration</option>
                <option>Corporate Advisory</option>
                <option>Startup Services</option>
              </select>

              <input
                value={form.industry}
                onChange={(e) => updateField("industry", e.target.value)}
                placeholder="Industry"
                className="input"
              />

              <input
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Location"
                className="input"
              />

              <input
                value={form.companySize}
                onChange={(e) => updateField("companySize", e.target.value)}
                placeholder="Company Size"
                className="input"
              />

              <input
                value={form.services}
                onChange={(e) => updateField("services", e.target.value)}
                placeholder="Services Used"
                className="input"
              />
            </div>
          </div>

          {/* STORY CONTENT */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {/* Challenge */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h3 className="font-semibold text-[#511D43] mb-3">
                Business Challenge
              </h3>

              <textarea
                rows={5}
                value={form.challenge}
                onChange={(e) => updateField("challenge", e.target.value)}
                placeholder="Describe client challenge..."
                className={inputStyle}
              />
            </div>

            {/* Solution */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h3 className="font-semibold text-[#511D43] mb-3">Solution</h3>

              <textarea
                rows={5}
                value={form.solution}
                onChange={(e) => updateField("solution", e.target.value)}
                placeholder="Describe solution..."
                className={inputStyle}
              />
            </div>

            {/* Implementation */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h3 className="font-semibold text-[#511D43] mb-3">
                Implementation
              </h3>

              <textarea
                rows={5}
                value={form.implementation}
                onChange={(e) => updateField("implementation", e.target.value)}
                placeholder="Implementation process..."
                className={inputStyle}
              />
            </div>

            {/* Outcome */}
            <div className="bg-white rounded-2xl border shadow-sm p-5">
              <h3 className="font-semibold text-[#511D43] mb-3">
                Outcome & Results
              </h3>

              <textarea
                rows={5}
                value={form.outcome}
                onChange={(e) => updateField("outcome", e.target.value)}
                placeholder="Business outcomes..."
                className={inputStyle}
              />
            </div>
          </div>
          {/* METRICS */}

          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-[#511D43]">
                Business Metrics
              </h3>

              <button
                type="button"
                onClick={addMetric}
                className="
                bg-[#901E3E]
                hover:bg-[#511D43]
                text-white
                px-4 py-2
                rounded-xl
                flex items-center gap-2
              "
              >
                <Plus size={16} />
                Add Metric
              </button>
            </div>

            {form.metrics.map((metric, index) => (
              <div
                key={index}
                className="grid md:grid-cols-[1fr_1fr_auto] gap-3 mb-3"
              >
                <input
                  value={metric.label}
                  onChange={(e) => metricChange(index, "label", e.target.value)}
                  placeholder="Metric Label"
                  className="input"
                />

                <input
                  value={metric.value}
                  onChange={(e) => metricChange(index, "value", e.target.value)}
                  placeholder="Metric Value"
                  className="input"
                />

                <button
                  type="button"
                  onClick={() => removeMetric(index)}
                  className="
                  bg-red-100
                  text-red-600
                  rounded-xl
                  px-4
                "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* FILE UPLOADS */}

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border shadow-sm p-6">
              <h3 className="font-bold text-[#511D43] mb-4">Cover Image</h3>

              <label className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#901E3E] transition">
                <ImageIcon size={40} className="text-[#901E3E]" />

                <span className="mt-3 text-sm text-slate-500">
                  Upload Cover Image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
              </label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt=""
                  className="
                  mt-4
                  rounded-2xl
                  h-56
                  w-full
                  object-cover
                "
                />
              )}
            </div>

            <div className="bg-white rounded-3xl border shadow-sm p-6">
              <h3 className="font-bold text-[#511D43] mb-4">PDF Case Study</h3>

              <label className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#901E3E] transition">
                <Upload size={40} className="text-[#901E3E]" />

                <span className="mt-3 text-sm text-slate-500">Upload PDF</span>

                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
              </label>

              {pdfFile && (
                <div className="mt-4 bg-green-50 p-4 rounded-xl flex items-center gap-3">
                  <FileText size={20} />

                  <span className="text-sm font-medium">{pdfFile.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* SETTINGS */}

          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <h3 className="text-xl font-bold text-[#511D43] mb-5">
              Publishing Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <label className="border rounded-2xl p-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => updateField("featured", e.target.checked)}
                />
                Featured Story
              </label>

              <select
                value={form.status}
                onChange={(e) => updateField("status", e.target.value)}
                className="input"
              >
                <option value="draft">Draft</option>

                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </form>

        {/* FOOTER */}

        <div className="border-t bg-white p-5 flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
            px-6 py-3
            rounded-xl
            bg-slate-200
            hover:bg-slate-300
          "
          >
            Cancel
          </button>

          <button
            onClick={submitHandler}
            disabled={saving}
            className="
            px-8 py-3
            rounded-xl
            bg-[#901E3E]
            hover:bg-[#511D43]
            text-white
            transition
            disabled:opacity-50
          "
          >
            {saving ? "Saving..." : story ? "Update Story" : "Create Story"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
