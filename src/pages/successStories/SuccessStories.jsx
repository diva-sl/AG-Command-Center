// // import { useState, useMemo } from "react";

// // import DashboardLayout from "../../components/layout/DashboardLayout";
// // import Loader from "../../components/common/Loader";

// // import StoryModal from "./StoryModal";

// // import {
// //   Plus,
// //   Pencil,
// //   Trash2,
// //   Star,
// //   Eye,
// //   FileText,
// //   Search,
// // } from "lucide-react";

// // import {
// //   useGetStoriesQuery,
// //   useDeleteStoryMutation,
// //   useToggleFeatureStoryMutation,
// //   useTogglePublishStoryMutation,
// // } from "../../redux/services/successStoryApi";

// // const SuccessStories = () => {
// //   const { data: stories = [], isLoading } = useGetStoriesQuery();

// //   const [deleteStory] = useDeleteStoryMutation();

// //   const [toggleFeature] = useToggleFeatureStoryMutation();

// //   const [togglePublish] = useTogglePublishStoryMutation();

// //   const [search, setSearch] = useState("");

// //   const [open, setOpen] = useState(false);

// //   const [selectedStory, setSelectedStory] = useState(null);

// //   const filteredStories = useMemo(() => {
// //     return stories.filter(
// //       (story) =>
// //         story.title?.toLowerCase().includes(search.toLowerCase()) ||
// //         story.category?.toLowerCase().includes(search.toLowerCase()),
// //     );
// //   }, [stories, search]);

// //   if (isLoading) {
// //     return (
// //       <DashboardLayout>
// //         <Loader />
// //       </DashboardLayout>
// //     );
// //   }

// //   return (
// //     <DashboardLayout>
// //       <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
// //         <div>
// //           <h1 className="text-3xl font-bold">Success Stories</h1>

// //           <p className="text-slate-500">Manage client success stories</p>
// //         </div>

// //         <button
// //           onClick={() => {
// //             setSelectedStory(null);
// //             setOpen(true);
// //           }}
// //           className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
// //         >
// //           <Plus size={18} />
// //           Create Story
// //         </button>
// //       </div>

// //       <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
// //         <div className="relative">
// //           <Search className="absolute left-4 top-3.5" size={18} />

// //           <input
// //             type="text"
// //             placeholder="Search stories..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="w-full border rounded-xl pl-12 pr-4 py-3"
// //           />
// //         </div>
// //       </div>

// //       <div className="grid gap-6">
// //         {filteredStories.map((story) => (
// //           <div
// //             key={story._id}
// //             className="bg-white rounded-3xl p-6 shadow-sm border"
// //           >
// //             <div className="flex flex-col lg:flex-row gap-6">
// //               <img
// //                 src={story.coverImage}
// //                 alt=""
// //                 className="w-full lg:w-56 h-40 object-cover rounded-2xl"
// //               />

// //               <div className="flex-1">
// //                 <div className="flex flex-wrap gap-2 mb-3">
// //                   <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
// //                     {story.category}
// //                   </span>

// //                   {story.featured && (
// //                     <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
// //                       Featured
// //                     </span>
// //                   )}

// //                   <span
// //                     className={`px-3 py-1 rounded-full text-xs ${
// //                       story.status === "published"
// //                         ? "bg-green-100 text-green-700"
// //                         : "bg-red-100 text-red-700"
// //                     }`}
// //                   >
// //                     {story.status}
// //                   </span>
// //                 </div>

// //                 <h2 className="text-xl font-bold">{story.title}</h2>

// //                 <p className="text-slate-500 mt-2">{story.industry}</p>

// //                 <div className="flex gap-6 mt-4 text-sm">
// //                   <div className="flex items-center gap-2">
// //                     <Eye size={16} />
// //                     {story.views}
// //                   </div>

// //                   <div className="flex items-center gap-2">
// //                     <FileText size={16} />
// //                     {story.downloads}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="flex lg:flex-col gap-2">
// //                 <button
// //                   onClick={() => toggleFeature(story._id)}
// //                   className="p-3 bg-yellow-100 rounded-xl"
// //                 >
// //                   <Star size={18} />
// //                 </button>

// //                 <button
// //                   onClick={() => togglePublish(story._id)}
// //                   className="p-3 bg-green-100 rounded-xl"
// //                 >
// //                   Publish
// //                 </button>

// //                 <button
// //                   onClick={() => {
// //                     setSelectedStory(story);
// //                     setOpen(true);
// //                   }}
// //                   className="p-3 bg-blue-100 rounded-xl"
// //                 >
// //                   <Pencil size={18} />
// //                 </button>

// //                 <button
// //                   onClick={() => {
// //                     if (window.confirm("Delete Story?")) {
// //                       deleteStory(story._id);
// //                     }
// //                   }}
// //                   className="p-3 bg-red-100 rounded-xl"
// //                 >
// //                   <Trash2 size={18} />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <StoryModal
// //         open={open}
// //         onClose={() => {
// //           setOpen(false);
// //           setSelectedStory(null);
// //         }}
// //         story={selectedStory}
// //       />
// //     </DashboardLayout>
// //   );
// // };

// // export default SuccessStories;

// import { useMemo, useState } from "react";
// import { CSVLink } from "react-csv";
// import { useNavigate } from "react-router-dom";

// import DashboardLayout from "../../components/layout/DashboardLayout";
// import Loader from "../../components/common/Loader";

// import StoryModal from "./StoryModal";

// import {
//   Search,
//   Plus,
//   Pencil,
//   Trash2,
//   Star,
//   Eye,
//   EyeOff,
//   BarChart3,
// } from "lucide-react";

// import {
//   useGetStoriesQuery,
//   useCreateStoryMutation,
//   useUpdateStoryMutation,
//   useDeleteStoryMutation,
//   useToggleFeatureStoryMutation,
//   useTogglePublishStoryMutation,
// } from "../../redux/services/successStoryApi";

// const SuccessStories = () => {
//   const navigate = useNavigate();

//   const { data: stories = [], isLoading } = useGetStoriesQuery();

//   const [createStory] = useCreateStoryMutation();
//   const [updateStory] = useUpdateStoryMutation();
//   const [deleteStory] = useDeleteStoryMutation();
//   const [toggleFeatureStory] = useToggleFeatureStoryMutation();
//   const [togglePublishStory] = useTogglePublishStoryMutation();

//   const [search, setSearch] = useState("");

//   const [filter, setFilter] = useState("all");

//   const [open, setOpen] = useState(false);

//   const [selectedStory, setSelectedStory] = useState(null);

//   const filteredStories = useMemo(() => {
//     let result = [...stories];

//     if (search) {
//       result = result.filter(
//         (story) =>
//           story.title?.toLowerCase().includes(search.toLowerCase()) ||
//           story.clientName?.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     if (filter === "published") {
//       result = result.filter((x) => x.isPublished);
//     }

//     if (filter === "draft") {
//       result = result.filter((x) => !x.isPublished);
//     }

//     if (filter === "featured") {
//       result = result.filter((x) => x.isFeatured);
//     }

//     return result;
//   }, [stories, search, filter]);

//   const handleSave = async (formData) => {
//     try {
//       if (selectedStory) {
//         await updateStory({
//           id: selectedStory._id,
//           ...formData,
//         }).unwrap();
//       } else {
//         await createStory(formData).unwrap();
//       }

//       setOpen(false);
//       setSelectedStory(null);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <DashboardLayout>
//         {" "}
//         <Loader />{" "}
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       {" "}
//       <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
//         {" "}
//         <div>
//           {" "}
//           <h1 className="text-3xl font-bold">Success Stories </h1>
//           <p className="text-slate-500">Manage client case studies</p>
//         </div>
//         <div className="flex gap-3 flex-wrap">
//           <CSVLink
//             data={filteredStories}
//             filename="success-stories.csv"
//             className="px-5 py-3 bg-green-600 text-white rounded-xl"
//           >
//             Export CSV
//           </CSVLink>

//           <button
//             onClick={() => navigate("/success-stories/analytics")}
//             className="px-5 py-3 bg-purple-600 text-white rounded-xl flex items-center gap-2"
//           >
//             <BarChart3 size={18} />
//             Analytics
//           </button>

//           <button
//             onClick={() => {
//               setSelectedStory(null);
//               setOpen(true);
//             }}
//             className="px-5 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2"
//           >
//             <Plus size={18} />
//             Create Story
//           </button>
//         </div>
//       </div>
//       <div className="bg-white rounded-2xl p-5 mb-6">
//         <div className="grid lg:grid-cols-3 gap-4">
//           <div className="relative">
//             <Search
//               size={18}
//               className="absolute left-3 top-3.5 text-slate-400"
//             />

//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search stories..."
//               className="w-full border rounded-xl pl-10 p-3"
//             />
//           </div>

//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border rounded-xl p-3"
//           >
//             <option value="all">All Stories</option>
//             <option value="published">Published</option>
//             <option value="draft">Draft</option>
//             <option value="featured">Featured</option>
//           </select>
//         </div>
//       </div>
//       {/* Desktop */}
//       <div className="hidden lg:block bg-white rounded-3xl overflow-hidden shadow-sm">
//         <table className="w-full">
//           <thead className="bg-slate-50">
//             <tr>
//               <th className="p-4 text-left">Title</th>
//               <th className="p-4 text-left">Client</th>
//               <th className="p-4 text-left">Published</th>
//               <th className="p-4 text-left">Featured</th>
//               <th className="p-4 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredStories.map((story) => (
//               <tr key={story._id} className="border-t">
//                 <td className="p-4 font-medium">{story.title}</td>

//                 <td className="p-4">{story.clientName}</td>

//                 <td className="p-4">
//                   <button onClick={() => togglePublishStory(story._id)}>
//                     {story.isPublished ? (
//                       <Eye className="text-green-600" />
//                     ) : (
//                       <EyeOff className="text-red-600" />
//                     )}
//                   </button>
//                 </td>

//                 <td className="p-4">
//                   <button onClick={() => toggleFeatureStory(story._id)}>
//                     <Star
//                       size={18}
//                       fill={story.isFeatured ? "currentColor" : "none"}
//                       className={
//                         story.isFeatured ? "text-yellow-500" : "text-slate-400"
//                       }
//                     />
//                   </button>
//                 </td>

//                 <td className="p-4">
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => {
//                         setSelectedStory(story);
//                         setOpen(true);
//                       }}
//                       className="p-2 rounded-lg bg-blue-100 text-blue-600"
//                     >
//                       <Pencil size={16} />
//                     </button>

//                     <button
//                       onClick={() => {
//                         if (window.confirm("Delete Story?")) {
//                           deleteStory(story._id);
//                         }
//                       }}
//                       className="p-2 rounded-lg bg-red-100 text-red-600"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Mobile */}
//       <div className="grid gap-4 lg:hidden">
//         {filteredStories.map((story) => (
//           <div key={story._id} className="bg-white rounded-2xl p-5 shadow-sm">
//             <h3 className="font-bold">{story.title}</h3>

//             <p className="text-sm text-slate-500 mt-1">{story.clientName}</p>

//             <div className="flex gap-3 mt-4">
//               <button onClick={() => toggleFeatureStory(story._id)}>
//                 <Star
//                   size={18}
//                   fill={story.isFeatured ? "currentColor" : "none"}
//                 />
//               </button>

//               <button onClick={() => togglePublishStory(story._id)}>
//                 {story.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
//               </button>

//               <button
//                 onClick={() => {
//                   setSelectedStory(story);
//                   setOpen(true);
//                 }}
//               >
//                 <Pencil size={18} />
//               </button>

//               <button onClick={() => deleteStory(story._id)}>
//                 <Trash2 size={18} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <StoryModal
//         open={open}
//         onClose={() => {
//           setOpen(false);
//           setSelectedStory(null);
//         }}
//         story={selectedStory}
//         onSubmit={handleSave}
//       />
//     </DashboardLayout>
//   );
// };

// export default SuccessStories;
import { useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";
import StoryModal from "./StoryModal";

import {
  Plus,
  Pencil,
  Trash2,
  Star,
  Search,
  Eye,
  FileText,
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  useGetStoriesQuery,
  useDeleteStoryMutation,
  useToggleFeatureStoryMutation,
  useTogglePublishStoryMutation,
} from "../../redux/services/successStoryApi";

const SuccessStories = () => {
  const { data: stories = [], isLoading } = useGetStoriesQuery();

  const [deleteStory] = useDeleteStoryMutation();
  const [toggleFeature] = useToggleFeatureStoryMutation();
  const [togglePublish] = useTogglePublishStoryMutation();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const searchMatch =
        story.title?.toLowerCase().includes(search.toLowerCase()) ||
        story.category?.toLowerCase().includes(search.toLowerCase()) ||
        story.industry?.toLowerCase().includes(search.toLowerCase());

      const categoryMatch = !category || story.category === category;

      return searchMatch && categoryMatch;
    });
  }, [stories, search, category]);

  const categories = [...new Set(stories.map((story) => story.category))];

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
            <h1 className="text-3xl md:text-4xl font-bold text-[#511D43]">
              Success Stories
            </h1>

            <p className="text-slate-500 mt-2">
              Manage client case studies and success stories
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/success-stories/analytics"
              className="
              bg-[#511D43]
              hover:bg-[#901E3E]
              text-white
              px-5
              py-3
              rounded-xl
              flex items-center gap-2
              transition
            "
            >
              <BarChart3 size={18} />
              Analytics
            </Link>

            <CSVLink
              data={filteredStories}
              filename="success-stories.csv"
              className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-5
              py-3
              rounded-xl
            "
            >
              Export CSV
            </CSVLink>

            <button
              onClick={() => {
                setSelectedStory(null);
                setOpen(true);
              }}
              className="
              bg-[#901E3E]
              hover:bg-[#511D43]
              text-white
              px-5
              py-3
              rounded-xl
              flex items-center gap-2
              transition
            "
            >
              <Plus size={18} />
              Create Story
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Total Stories</p>

            <h2 className="text-3xl font-bold text-[#511D43] mt-2">
              {stories.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Published</p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {stories.filter((s) => s.status === "published").length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Featured</p>

            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
              {stories.filter((s) => s.featured).length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Total Views</p>

            <h2 className="text-3xl font-bold text-[#901E3E] mt-2">
              {stories.reduce((a, b) => a + (b.views || 0), 0)}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#901E3E]/10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search stories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                w-full
                border
                rounded-xl
                pl-12
                pr-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-[#901E3E]
              "
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-[#901E3E]
            "
            >
              <option value="">All Categories</option>

              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div className="bg-white rounded-3xl p-10 text-center border">
            <h3 className="text-xl font-semibold text-[#511D43]">
              No Stories Found
            </h3>

            <p className="text-slate-500 mt-2">
              Create your first success story.
            </p>
          </div>
        )}

        {/* Stories */}
        <div className="grid gap-6">
          {filteredStories.map((story) => (
            <div
              key={story._id}
              className="
              bg-white
              rounded-3xl
              p-5 md:p-6
              shadow-sm
              border
              border-[#901E3E]/10
              hover:shadow-md
              transition
            "
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <img
                  src={story.coverImage}
                  alt=""
                  className="
                  w-full
                  lg:w-72
                  h-52
                  lg:h-44
                  object-cover
                  rounded-2xl
                "
                />

                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#511D43]/10 text-[#511D43] px-3 py-1 rounded-full text-xs">
                      {story.category}
                    </span>

                    {story.featured && (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                        Featured
                      </span>
                    )}

                    {story.status === "published" ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <CheckCircle size={12} />
                        Published
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <XCircle size={12} />
                        Draft
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-[#511D43]">
                    {story.title}
                  </h2>

                  <p className="text-slate-500 mt-2">{story.industry}</p>

                  <div className="flex flex-wrap gap-6 mt-5 text-sm">
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      {story.views || 0} Views
                    </div>

                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      {story.downloads || 0} Downloads
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col gap-2">
                  <button
                    onClick={() => toggleFeature(story._id)}
                    className={`p-3 rounded-xl transition ${
                      story.featured
                        ? "bg-yellow-500 text-white"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <Star size={18} />
                  </button>

                  <button
                    onClick={() => togglePublish(story._id)}
                    className={`p-3 rounded-xl transition ${
                      story.status === "published"
                        ? "bg-green-500 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {story.status === "published" ? "Live" : "Draft"}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedStory(story);
                      setOpen(true);
                    }}
                    className="
                    p-3
                    rounded-xl
                    bg-[#511D43]/10
                    text-[#511D43]
                    hover:bg-[#511D43]/20
                    transition
                  "
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm("Delete this story?")) {
                        deleteStory(story._id);
                      }
                    }}
                    className="
                    p-3
                    rounded-xl
                    bg-red-100
                    text-red-700
                    hover:bg-red-200
                    transition
                  "
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <StoryModal
          open={open}
          story={selectedStory}
          onClose={() => {
            setOpen(false);
            setSelectedStory(null);
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default SuccessStories;
