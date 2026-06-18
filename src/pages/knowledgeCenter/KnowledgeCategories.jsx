import { useMemo, useState } from "react";

import { FolderTree, Plus, Search, Pencil, Trash2 } from "lucide-react";

import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../redux/services/knowledgeApi";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";

import CategoryModal from "./CategoryModal";

const KnowledgeCategories = () => {
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const { data, isLoading } = useGetCategoriesQuery();

  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = data?.data || [];

  const filteredCategories = useMemo(() => {
    return categories.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const activeCount = categories.filter((item) => item.isActive).length;

  const inactiveCount = categories.filter((item) => !item.isActive).length;

  const handleDelete = async () => {
    try {
      await deleteCategory(deleteId).unwrap();

      setDeleteId(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard title="Total Categories" value={categories.length} />

        <StatCard title="Active" value={activeCount} />

        <StatCard title="Inactive" value={inactiveCount} />
      </div>

      {/* Header */}

      <div className="bg-white border rounded-3xl p-5">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                border
                rounded-xl
                py-3
                pl-11
                pr-4
              "
            />
          </div>

          <button
            onClick={() => {
              setSelectedCategory(null);

              setModalOpen(true);
            }}
            className="
              bg-gradient-to-r
              from-[#511D43]
              to-[#901E3E]
              text-white
              px-5
              py-3
              rounded-xl
              flex
              items-center
              gap-2
            "
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>
      </div>

      {/* Categories */}

      <div className="bg-white border rounded-3xl overflow-hidden">
        {filteredCategories.length === 0 ? (
          <EmptyState
            title="No Categories Found"
            description="Create your first category."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="p-4 text-left">Category</th>

                  <th className="p-4 text-left">Slug</th>

                  <th className="p-4 text-left">Description</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category._id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <FolderTree size={18} className="text-[#901E3E]" />

                        <span className="font-medium">{category.name}</span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-500">{category.slug}</td>

                    <td className="p-4 max-w-sm truncate">
                      {category.description}
                    </td>

                    <td className="p-4">
                      <span
                        className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            ${
                              category.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedCategory(category);

                            setModalOpen(true);
                          }}
                          className="
                              p-2
                              border
                              rounded-lg
                              hover:bg-slate-100
                            "
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteId(category._id)}
                          className="
                              p-2
                              border
                              rounded-lg
                              text-red-600
                              hover:bg-red-50
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
        )}
      </div>

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedCategory}
      />

      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        description="Are you sure you want to delete this category?"
      />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white border rounded-2xl p-5">
    <p className="text-slate-500 text-sm">{title}</p>

    <h3 className="text-2xl font-bold text-[#511D43] mt-2">{value}</h3>
  </div>
);

export default KnowledgeCategories;
