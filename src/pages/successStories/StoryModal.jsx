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

  const inputClass = `
w-full
h-12
px-4
rounded-xl
border
border-slate-200
bg-white
text-slate-700
placeholder:text-slate-400
shadow-sm
transition-all
duration-300
focus:outline-none
focus:ring-4
focus:ring-[#901E3E]/10
focus:border-[#901E3E]
`;

  const textareaClass = `
w-full
min-h-[160px]
px-4
py-3
rounded-xl
border
border-slate-200
bg-white
text-slate-700
placeholder:text-slate-400
shadow-sm
resize-none
transition-all
duration-300
focus:outline-none
focus:ring-4
focus:ring-[#901E3E]/10
focus:border-[#901E3E]
`;

  const cardClass = `
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-6
lg:p-8
`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 md:p-6">
      <div
        className="
    bg-slate-50
    w-full
    max-w-7xl
    h-[95vh]
    rounded-3xl
    overflow-hidden
    shadow-2xl
    flex
    flex-col
  "
      >
        {/* HEADER */}
        <div
          className="
  sticky
  top-0
  z-20
  bg-gradient-to-r
  from-[#511D43]
  via-[#6a2555]
  to-[#901E3E]
  text-white
  px-6
  lg:px-8
  py-5
  "
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">
                {story ? "Edit Success Story" : "Create Success Story"}
              </h2>

              <p className="text-white/80 text-sm mt-1">
                AG Associates Success Story Management
              </p>
            </div>

            <button
              onClick={onClose}
              className="
      h-11
      w-11
      rounded-xl
      bg-white/10
      hover:bg-white/20
      flex
      items-center
      justify-center
      transition
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

          <div className={cardClass}>
            <h3 className="text-xl font-bold text-[#511D43] mb-6">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <input
                className={inputClass}
                placeholder="Story Title"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
              />

              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
              >
                <option>Tax Planning</option>
                <option>Income Tax Filing</option>
                <option>GST Services</option>
                <option>Business Registration</option>
                <option>Corporate Advisory</option>
                <option>Startup Services</option>
              </select>

              <input
                className={inputClass}
                placeholder="Industry"
                value={form.industry}
                onChange={(e) => updateField("industry", e.target.value)}
              />

              <input
                className={inputClass}
                placeholder="Location"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
              />

              <input
                className={inputClass}
                placeholder="Company Size"
                value={form.companySize}
                onChange={(e) => updateField("companySize", e.target.value)}
              />

              <input
                className={inputClass}
                placeholder="Services Used"
                value={form.services}
                onChange={(e) => updateField("services", e.target.value)}
              />
            </div>
          </div>
          {/* STORY CONTENT */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className={cardClass}>
              <h3 className="font-bold text-[#511D43] mb-4">
                Business Challenge
              </h3>

              <textarea
                className={textareaClass}
                value={form.challenge}
                onChange={(e) => updateField("challenge", e.target.value)}
              />
            </div>

            <div className={cardClass}>
              <h3 className="font-bold text-[#511D43] mb-4">Solution</h3>

              <textarea
                className={textareaClass}
                value={form.solution}
                onChange={(e) => updateField("solution", e.target.value)}
              />
            </div>

            <div className={cardClass}>
              <h3 className="font-bold text-[#511D43] mb-4">Implementation</h3>

              <textarea
                className={textareaClass}
                value={form.implementation}
                onChange={(e) => updateField("implementation", e.target.value)}
              />
            </div>

            <div className={cardClass}>
              <h3 className="font-bold text-[#511D43] mb-4">
                Outcome & Results
              </h3>

              <textarea
                className={textareaClass}
                value={form.outcome}
                onChange={(e) => updateField("outcome", e.target.value)}
              />
            </div>
          </div>
          {/* FILE UPLOADS */}

          <div className="grid lg:grid-cols-2 gap-6">
            <div className={cardClass}>
              <h3 className="font-bold text-[#511D43] mb-5">Cover Image</h3>

              <label
                className="
      border-2
      border-dashed
      border-slate-300
      rounded-2xl
      p-10
      flex
      flex-col
      items-center
      justify-center
      cursor-pointer
      hover:border-[#901E3E]
      hover:bg-[#901E3E]/5
      transition
      "
              >
                <ImageIcon size={40} />

                <span className="mt-3 text-sm">Upload Cover Image</span>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
              </label>
            </div>

            <div className={cardClass}>
              <h3 className="font-bold text-[#511D43] mb-5">PDF Case Study</h3>

              <label
                className="
      border-2
      border-dashed
      border-slate-300
      rounded-2xl
      p-10
      flex
      flex-col
      items-center
      justify-center
      cursor-pointer
      hover:border-[#901E3E]
      hover:bg-[#901E3E]/5
      transition
      "
              >
                <Upload size={40} />

                <span className="mt-3 text-sm">Upload PDF</span>

                <input
                  hidden
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
              </label>
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

        <div
          className="
  sticky
  bottom-0
  bg-white
  border-t
  px-6
  py-4
  flex
  flex-col
  sm:flex-row
  justify-end
  gap-3
  "
        >
          <button
            type="button"
            onClick={onClose}
            className="
    px-6
    py-3
    rounded-xl
    bg-slate-200
    hover:bg-slate-300
    "
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={submitHandler}
            className="
    px-8
    py-3
    rounded-xl
    bg-gradient-to-r
    from-[#511D43]
    to-[#901E3E]
    text-white
    font-semibold
    shadow-lg
    hover:shadow-xl
    transition-all
    disabled:opacity-50
    "
          >
            {saving ? "Saving..." : "Save Story"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
