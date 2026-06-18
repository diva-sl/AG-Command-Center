import { useEffect, useState } from "react";

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/services/knowledgeApi";

const CategoryModal = ({ open, onClose, category }) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const [updateCategory] = useUpdateCategoryMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true,
  });

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

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "",

        description: category.description || "",

        isActive: category.isActive ?? true,
      });
    } else {
      setForm({
        name: "",
        description: "",
        isActive: true,
      });
    }
  }, [category]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (category) {
        await updateCategory({
          id: category._id,
          ...form,
        }).unwrap();
      } else {
        await createCategory(form).unwrap();

        setForm({
          name: "",
          description: "",
          isActive: true,
        });
      }

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!open) return null;

  return (
    <div
      className="
      fixed inset-0 z-50
      bg-black/60
      backdrop-blur-sm
      flex items-center
      justify-center
      p-4
    "
    >
      <div
        className="
        bg-white
        rounded-3xl
        w-full
        max-w-2xl
        shadow-2xl
        overflow-hidden
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {category ? "Edit Category" : "Create Category"}
              </h2>

              <p className="text-white/80 mt-1 text-sm">
                Organize knowledge center articles
              </p>
            </div>

            <button
              onClick={onClose}
              className="
              w-10 h-10
              rounded-full
              hover:bg-white/20
              transition
            "
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form */}

        <form onSubmit={submitHandler} className="p-6 space-y-6">
          {/* Category Name */}

          <div>
            <label
              className="
              block
              mb-2
              font-medium
              text-[#511D43]
            "
            >
              Category Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Income Tax"
              required
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-[#901E3E]
              "
            />
          </div>

          {/* Description */}

          <div>
            <label
              className="
              block
              mb-2
              font-medium
              text-[#511D43]
            "
            >
              Description
            </label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Articles related to Income Tax filing, notices, deductions, compliance and updates."
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                resize-none
                focus:outline-none
                focus:ring-2
                focus:ring-[#901E3E]
              "
            />
          </div>

          {/* Status */}

          <div>
            <label
              className="
              block
              mb-3
              font-medium
              text-[#511D43]
            "
            >
              Category Settings
            </label>

            <label
              className="
              flex
              items-center
              gap-3
              border-2
              rounded-2xl
              p-4
              cursor-pointer
              hover:border-[#901E3E]
              transition
            "
            >
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({
                    ...form,
                    isActive: e.target.checked,
                  })
                }
              />

              <span>Active Category</span>
            </label>
          </div>

          {/* Footer */}

          <div
            className="
            flex
            flex-col
            sm:flex-row
            justify-end
            gap-3
            pt-4
            border-t
          "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                px-6
                py-3
                rounded-xl
                border
                hover:bg-slate-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="
                px-6
                py-3
                rounded-xl
                text-white
                bg-gradient-to-r
                from-[#511D43]
                to-[#901E3E]
                hover:opacity-90
                transition
              "
            >
              {category ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
