import { useEffect, useState } from "react";

import { X, Upload, Image as ImageIcon } from "lucide-react";

import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetCategoriesQuery,
} from "../../redux/services/knowledgeApi";
import KnowledgeEditor from "./KnowledgeEditor";

const KnowledgeModal = ({ open, onClose, post }) => {
  const { data: categoryData } = useGetCategoriesQuery();

  const [createPost, { isLoading }] = useCreatePostMutation();

  const [updatePost] = useUpdatePostMutation();

  const [imagePreview, setImagePreview] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [editorMode, setEditorMode] = useState("visual");

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    tags: "",
    content: "",

    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",

    featured: false,
    status: "draft",
  });

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || "",

        excerpt: post.excerpt || "",

        category: post.category?._id || "",

        tags: post.tags?.join(", ") || "",

        content: post.content || "",

        seoTitle: post.seoTitle || "",

        seoDescription: post.seoDescription || "",

        seoKeywords: post.seoKeywords?.join(", ") || "",

        featured: post.featured || false,

        status: post.status || "draft",
      });

      setImagePreview(post.featuredImage || "");
    } else {
      resetForm();
    }
  }, [post]);

  const resetForm = () => {
    setForm({
      title: "",
      excerpt: "",
      category: "",
      tags: "",
      content: "",

      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",

      featured: false,
      status: "draft",
    });

    setImagePreview("");

    setImageFile(null);
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setImagePreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);

      formData.append("excerpt", form.excerpt);

      formData.append("category", form.category);

      formData.append("content", form.content);

      formData.append("featured", form.featured);

      formData.append("status", form.status);

      formData.append("seoTitle", form.seoTitle);

      formData.append("seoDescription", form.seoDescription);

      formData.append("tags", form.tags);

      formData.append("seoKeywords", form.seoKeywords);

      if (imageFile) {
        formData.append("featuredImage", imageFile);
      }

      if (post) {
        await updatePost({
          id: post._id,
          ...Object.fromEntries(formData),
        }).unwrap();
      } else {
        await createPost(formData).unwrap();
      }

      onClose();

      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0 z-50
      bg-black/60
      backdrop-blur-sm
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
        max-w-6xl
        max-h-[95vh]
        overflow-hidden
        flex
        flex-col
      "
      >
        {/* Header */}

        <div
          className="
          bg-gradient-to-r
          from-[#511D43]
          to-[#901E3E]
          text-white
          p-6
        "
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                {post ? "Edit Article" : "Create Article"}
              </h2>

              <p className="text-white/80">Knowledge Center</p>
            </div>

            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        {/* Form */}

        <form
          onSubmit={submitHandler}
          className="
          flex-1
          overflow-y-auto
          p-6
          space-y-8
        "
        >
          {/* Image */}

          <div>
            <label className="font-medium">Featured Image</label>

            <div
              className="
              mt-3
              border-2
              border-dashed
              rounded-2xl
              p-6
            "
            >
              <label className="cursor-pointer">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={imageHandler}
                />

                <div className="flex flex-col items-center gap-3">
                  <Upload />

                  <span>Upload Image</span>
                </div>
              </label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt=""
                  className="
                    mt-4
                    h-56
                    w-full
                    object-cover
                    rounded-xl
                  "
                />
              )}
            </div>
          </div>

          {/* Basic */}

          <div className="grid lg:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="border rounded-xl p-3"
              required
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            >
              <option value="">Select Category</option>

              {categoryData?.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            rows={3}
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={(e) =>
              setForm({
                ...form,
                excerpt: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={(e) =>
              setForm({
                ...form,
                tags: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          {/* Content */}

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-[#511D43]">
                Article Content
              </label>
              <button
                type="button"
                onClick={() =>
                  setEditorMode(editorMode === "visual" ? "html" : "visual")
                }
                className="
    px-4
    py-2
    text-sm
    rounded-lg
    border
  "
              >
                {editorMode === "visual" ? "HTML Mode" : "Visual Mode"}
              </button>
            </div>

            {editorMode === "visual" ? (
              <KnowledgeEditor
                value={form.content}
                onChange={(content) =>
                  setForm({
                    ...form,
                    content,
                  })
                }
              />
            ) : (
              <textarea
                rows={25}
                value={form.content}
                onChange={(e) =>
                  setForm({
                    ...form,
                    content: e.target.value,
                  })
                }
                className="
w-full
border
rounded-xl
p-4
font-mono
text-sm
"
              />
            )}
          </div>

          {/* SEO */}

          <div className="border rounded-2xl p-5">
            <h3 className="font-bold mb-4">SEO Settings</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="SEO Title"
                value={form.seoTitle}
                onChange={(e) =>
                  setForm({
                    ...form,
                    seoTitle: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

              <textarea
                rows={3}
                placeholder="SEO Description"
                value={form.seoDescription}
                onChange={(e) =>
                  setForm({
                    ...form,
                    seoDescription: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                type="text"
                placeholder="SEO Keywords"
                value={form.seoKeywords}
                onChange={(e) =>
                  setForm({
                    ...form,
                    seoKeywords: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />
            </div>
          </div>

          {/* Settings */}

          <div className="grid md:grid-cols-2 gap-5">
            <label className="border rounded-2xl p-4 flex gap-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({
                    ...form,
                    featured: e.target.checked,
                  })
                }
              />
              Featured Post
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              className="border rounded-xl p-3"
            >
              <option value="draft">Draft</option>

              <option value="published">Published</option>
            </select>
          </div>
        </form>

        {/* Footer */}

        <div className="border-t p-5 flex justify-end gap-3">
          <button onClick={onClose} className="border px-6 py-3 rounded-xl">
            Cancel
          </button>

          <button
            onClick={submitHandler}
            disabled={isLoading}
            className="
            px-6
            py-3
            rounded-xl
            text-white
            bg-gradient-to-r
            from-[#511D43]
            to-[#901E3E]
          "
          >
            {post ? "Update Article" : "Create Article"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeModal;
