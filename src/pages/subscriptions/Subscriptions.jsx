import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";

import { Pencil, Trash2, Plus, CheckCircle, XCircle, Star } from "lucide-react";

// import { useGetPlansQuery } from "../../redux/services/planApi";

import { useState } from "react";

import PlanModal from "./PlanModal";

import {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useTogglePlanMutation,
  useToggleHighlightMutation,
} from "../../redux/services/planApi";

const Subscriptions = () => {
  const [open, setOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [createPlan, { isLoading: creating }] = useCreatePlanMutation();

  const [updatePlan, { isLoading: updating }] = useUpdatePlanMutation();

  const [deletePlan] = useDeletePlanMutation();

  const [togglePlan] = useTogglePlanMutation();

  const { data: plans = [], isLoading } = useGetPlansQuery();
  const [toggleHighlight] = useToggleHighlightMutation();

  const handleSave = async (formData) => {
    try {
      if (selectedPlan) {
        await updatePlan({
          id: selectedPlan._id,
          ...formData,
        }).unwrap();
      } else {
        await createPlan(formData).unwrap();
      }

      setOpen(false);
      setSelectedPlan(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 -m-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#511D43]">
              Subscription Plans
            </h1>

            <p className="text-slate-500 mt-2">
              Manage pricing plans and service offerings.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedPlan(null);
              setOpen(true);
            }}
            className="
            bg-[#901E3E]
            hover:bg-[#511D43]
            text-white
            px-5
            py-3
            rounded-xl
            flex items-center
            gap-2
            transition
            shadow-sm
            w-full lg:w-auto
            justify-center
          "
          >
            <Plus size={18} />
            Create Plan
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Total Plans</p>

            <h2 className="text-3xl font-bold text-[#511D43] mt-2">
              {plans.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Active Plans</p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {plans.filter((p) => p.isActive).length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Featured Plans</p>

            <h2 className="text-3xl font-bold text-[#901E3E] mt-2">
              {plans.filter((p) => p.highlight).length}
            </h2>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="xl:hidden space-y-4">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="
              bg-white
              rounded-2xl
              border
              shadow-sm
              p-5
            "
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#511D43]">{plan.name}</h3>

                    {plan.highlight && (
                      <span className="px-2 py-1 rounded-full text-[10px] bg-yellow-100 text-yellow-700">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-slate-500 text-sm mt-1">{plan.category}</p>
                </div>

                <button onClick={() => togglePlan(plan._id)}>
                  {plan.isActive ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                      Disabled
                    </span>
                  )}
                </button>
              </div>

              <div className="mt-4">
                <p className="text-3xl font-bold text-green-600">
                  ₹{plan.price}
                </p>

                {plan.originalPrice > 0 && (
                  <p className="line-through text-slate-400 text-sm">
                    ₹{plan.originalPrice}
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setOpen(true);
                  }}
                  className="
                  p-2
                  rounded-xl
                  bg-[#511D43]/10
                  text-[#511D43]
                  hover:bg-[#511D43]/20
                "
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => toggleHighlight(plan._id)}
                  className="
                  p-2
                  rounded-xl
                  bg-yellow-100
                "
                >
                  <Star
                    size={16}
                    fill={plan.highlight ? "currentColor" : "none"}
                    className="text-yellow-500"
                  />
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Delete plan?")) {
                      deletePlan(plan._id);
                    }
                  }}
                  className="
                  p-2
                  rounded-xl
                  bg-red-100
                  text-red-600
                "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden xl:block bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#511D43] text-white">
                <tr>
                  <th className="p-4 text-left">Plan</th>

                  <th className="p-4 text-left">Category</th>

                  <th className="p-4 text-left">Price</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Featured</th>

                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {plans.map((plan) => (
                  <tr key={plan._id} className="border-t hover:bg-slate-50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-[#511D43]">
                          {plan.name}
                        </h4>

                        {plan.highlight && (
                          <span className="px-2 py-1 rounded-full text-[10px] bg-yellow-100 text-yellow-700">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-4">{plan.category}</td>

                    <td className="p-4">
                      <div>
                        <div className="font-semibold text-green-600">
                          ₹{plan.price}
                        </div>

                        <div className="text-xs line-through text-slate-400">
                          ₹{plan.originalPrice}
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <button onClick={() => togglePlan(plan._id)}>
                        {plan.isActive ? (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                            <CheckCircle size={14} />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                            <XCircle size={14} />
                            Disabled
                          </span>
                        )}
                      </button>
                    </td>

                    <td className="p-4">
                      <button onClick={() => toggleHighlight(plan._id)}>
                        <Star
                          size={18}
                          fill={plan.highlight ? "currentColor" : "none"}
                          className={
                            plan.highlight
                              ? "text-yellow-500"
                              : "text-slate-300"
                          }
                        />
                      </button>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedPlan(plan);
                            setOpen(true);
                          }}
                          className="
                          p-2
                          rounded-lg
                          bg-[#511D43]/10
                          text-[#511D43]
                          hover:bg-[#511D43]/20
                        "
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm("Delete plan?")) {
                              deletePlan(plan._id);
                            }
                          }}
                          className="
                          p-2
                          rounded-lg
                          bg-red-100
                          text-red-600
                          hover:bg-red-200
                        "
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <PlanModal
          loading={creating || updating}
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedPlan(null);
          }}
          plan={selectedPlan}
          onSubmit={handleSave}
        />
      </div>
    </DashboardLayout>
  );
};

export default Subscriptions;
