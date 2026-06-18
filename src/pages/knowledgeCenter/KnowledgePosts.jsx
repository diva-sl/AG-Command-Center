import { useMemo, useState } from "react";

import { Plus, RefreshCw, Search, Star, Eye } from "lucide-react";

import {
  useGetPostsQuery,
  useDeletePostMutation,
  useToggleFeaturedMutation,
  useToggleStatusMutation,
} from "../../redux/services/knowledgeApi";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";

import KnowledgeModal from "./KnowledgeModal";

const KnowledgePosts = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [category, setCategory] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const { data, isLoading, refetch } = useGetPostsQuery({
    search,
    status,
    category,
  });

  const [deletePost] = useDeletePostMutation();

  const [toggleFeatured] = useToggleFeaturedMutation();

  const [toggleStatus] = useToggleStatusMutation();

  const posts = data?.data || [];

  const stats = useMemo(() => {
    return {
      total: posts.length,

      published: posts.filter((p) => p.status === "published").length,

      drafts: posts.filter((p) => p.status === "draft").length,

      featured: posts.filter((p) => p.featured).length,
    };
  }, [posts]);

  const handleDelete = async () => {
    try {
      await deletePost(deleteId).unwrap();

      setDeleteId(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Posts" value={stats.total} />

        <StatCard title="Published" value={stats.published} />

        <StatCard title="Drafts" value={stats.drafts} />

        <StatCard title="Featured" value={stats.featured} />
      </div>

      {/* Filters */}

      <div className="bg-white border rounded-3xl p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search articles..."
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

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              border
              rounded-xl
              px-4
              py-3
            "
          >
            <option value="">All Status</option>

            <option value="published">Published</option>

            <option value="draft">Draft</option>
          </select>

          <button
            onClick={refetch}
            className="
              border
              rounded-xl
              px-4
              py-3
              flex
              items-center
              gap-2
            "
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <button
            onClick={() => {
              setSelectedPost(null);

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
            Create Post
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white border rounded-3xl overflow-hidden">
        {posts.length === 0 ? (
          <EmptyState
            title="No Articles Found"
            description="Create your first knowledge article."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="p-4 text-left">Article</th>

                  <th className="p-4 text-left">Category</th>

                  <th className="p-4 text-left">Views</th>

                  <th className="p-4 text-left">Rating</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className="border-b">
                    <td className="p-4">
                      <div className="flex gap-3">
                        <img
                          src={post.featuredImage}
                          alt=""
                          className="
                              w-16
                              h-16
                              rounded-xl
                              object-cover
                            "
                        />

                        <div>
                          <h4 className="font-semibold">{post.title}</h4>

                          <p className="text-xs text-slate-500">
                            {post.readingTime}
                            min read
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">{post.category?.name}</td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Eye size={16} />
                        {post.views}
                      </div>
                    </td>

                    <td className="p-4">{post.averageRating}</td>

                    <td className="p-4">
                      <span
                        className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            ${
                              post.status === "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          `}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setSelectedPost(post);

                            setModalOpen(true);
                          }}
                          className="px-3 py-2 border rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => toggleFeatured(post._id)}
                          className="px-3 py-2 border rounded-lg"
                        >
                          <Star size={16} />
                        </button>

                        <button
                          onClick={() => toggleStatus(post._id)}
                          className="px-3 py-2 border rounded-lg"
                        >
                          Publish
                        </button>

                        <button
                          onClick={() => setDeleteId(post._id)}
                          className="px-3 py-2 text-red-600 border rounded-lg"
                        >
                          Delete
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

      <KnowledgeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        post={selectedPost}
      />

      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Article"
        description="Are you sure you want to delete this article?"
      />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-2xl border p-5">
    <p className="text-sm text-slate-500">{title}</p>

    <h3 className="text-2xl font-bold text-[#511D43] mt-2">{value}</h3>
  </div>
);

export default KnowledgePosts;
