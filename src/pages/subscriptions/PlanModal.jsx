import { useEffect, useState } from "react";

const PlanModal = ({ open, onClose, onSubmit, plan }) => {
  const [form, setForm] = useState({
    category: "",
    name: "",
    price: "",
    originalPrice: "",
    ideal: "",
    features: "",
    highlight: false,
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
    if (plan) {
      setForm({
        category: plan.category || "",
        name: plan.name || "",
        price: plan.price || "",
        originalPrice: plan.originalPrice || "",
        ideal: plan.ideal || "",
        features: plan.features?.join("\n") || "",
        highlight: plan.highlight || false,
        isActive: plan.isActive ?? true,
      });
    } else {
      setForm({
        category: "",
        name: "",
        price: "",
        originalPrice: "",
        ideal: "",
        features: "",
        highlight: false,
        isActive: true,
      });
    }
  }, [plan]);

  if (!open) return null;

  const submitHandler = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,

      price: Number(form.price),

      originalPrice: Number(form.originalPrice),

      features: form.features.split("\n").filter((item) => item.trim() !== ""),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="
        bg-white
        rounded-3xl
        w-full
        max-w-4xl
        max-h-[90vh]
        flex
        flex-col
        shadow-2xl
        overflow-hidden
      "
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#511D43] to-[#901E3E] text-white p-6 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {plan ? "Edit Plan" : "Create Plan"}
              </h2>

              <p className="text-white/80 mt-1 text-sm">
                Manage subscription pricing and features
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
        <form
          onSubmit={submitHandler}
          className="
          flex-1
          overflow-y-auto
          p-6
          md:p-8
          space-y-6
        "
        >
          {/* Category + Name */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium text-[#511D43]">
                Category
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
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
                required
              >
                <option value="">Select Category</option>

                <option value="Income Tax">Income Tax</option>

                <option value="Advisory">Advisory</option>

                <option value="GST">GST</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-[#511D43]">
                Plan Name
              </label>

              <input
                type="text"
                placeholder="Premium Tax Filing"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
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
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="font-semibold text-[#511D43] mb-4">Pricing</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-medium">Selling Price</label>

                <input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      price: e.target.value,
                    })
                  }
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
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Original Price</label>

                <input
                  type="number"
                  value={form.originalPrice}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      originalPrice: e.target.value,
                    })
                  }
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
            </div>
          </div>

          {/* Ideal For */}
          <div>
            <label className="block mb-2 font-medium text-[#511D43]">
              Ideal For
            </label>

            <textarea
              rows={4}
              value={form.ideal}
              onChange={(e) =>
                setForm({
                  ...form,
                  ideal: e.target.value,
                })
              }
              placeholder="Suitable for salaried employees, freelancers, startups..."
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

          {/* Features */}
          <div>
            <label className="block mb-2 font-medium text-[#511D43]">
              Features
            </label>

            <textarea
              rows={6}
              value={form.features}
              onChange={(e) =>
                setForm({
                  ...form,
                  features: e.target.value,
                })
              }
              placeholder={`ITR Filing
Tax Planning
Priority Support
GST Consultation`}
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

            <p className="text-xs text-slate-500 mt-2">
              Enter one feature per line
            </p>
          </div>

          {/* Settings */}
          <div>
            <h3 className="font-semibold text-[#511D43] mb-4">Plan Settings</h3>

            <div className="grid md:grid-cols-2 gap-5">
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
                  checked={form.highlight}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      highlight: e.target.checked,
                    })
                  }
                />

                <span>Featured Plan</span>
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

                <span>Active Plan</span>
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t bg-white p-5 flex flex-col sm:flex-row justify-end gap-3 shrink-0">
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
            onClick={submitHandler}
            className="
            px-6
            py-3
            rounded-xl
            bg-[#901E3E]
            text-white
            hover:bg-[#511D43]
            transition
          "
          >
            {plan ? "Update Plan" : "Create Plan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
