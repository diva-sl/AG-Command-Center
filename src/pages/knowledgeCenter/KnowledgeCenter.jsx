import DashboardLayout from "../../components/layout/DashboardLayout";

import { FileText, FolderTree, MessageSquare, BarChart3 } from "lucide-react";

import { useSearchParams } from "react-router-dom";

import KnowledgePosts from "./KnowledgePosts";
import KnowledgeCategories from "./KnowledgeCategories";
import KnowledgeQuestions from "./KnowledgeQuestions";
import KnowledgeAnalytics from "./KnowledgeAnalytics";

const tabs = [
  {
    key: "posts",
    label: "All Posts",
    icon: FileText,
  },
  {
    key: "categories",
    label: "Categories",
    icon: FolderTree,
  },
  {
    key: "questions",
    label: "Questions",
    icon: MessageSquare,
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

const KnowledgeCenter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "posts";

  const changeTab = (tab) => {
    setSearchParams({
      tab,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Hero */}

        <div
          className="
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r
        from-[#511D43]
        via-[#6A204D]
        to-[#901E3E]
        p-6
        md:p-8
        text-white
      "
        >
          <div className="relative z-10">
            <h1 className="text-2xl md:text-4xl font-bold">Knowledge Center</h1>

            <p className="mt-2 text-sm md:text-base text-white/80 max-w-2xl">
              Manage articles, categories, community questions, SEO content and
              analytics from one place.
            </p>
          </div>

          <div
            className="
          absolute
          -right-10
          -top-10
          h-40
          w-40
          rounded-full
          bg-white/10
        "
          />

          <div
            className="
          absolute
          right-20
          bottom-0
          h-24
          w-24
          rounded-full
          bg-white/10
        "
          />
        </div>

        {/* Quick Stats */}

        <div
          className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-4
      "
        >
          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Posts</p>

            <h3 className="text-2xl font-bold text-[#511D43]">--</h3>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Categories</p>

            <h3 className="text-2xl font-bold text-[#511D43]">--</h3>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Questions</p>

            <h3 className="text-2xl font-bold text-[#511D43]">--</h3>
          </div>

          <div className="bg-white rounded-2xl border p-5">
            <p className="text-sm text-slate-500">Views</p>

            <h3 className="text-2xl font-bold text-[#511D43]">--</h3>
          </div>
        </div>

        {/* Tabs */}

        <div
          className="
        sticky
        top-0
        z-20
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-2
      "
        >
          <div
            className="
          flex
          gap-2
          overflow-x-auto
          scrollbar-hide
        "
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;

              const active = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => changeTab(tab.key)}
                  className={`
                  shrink-0
                  flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-2xl
                  font-medium
                  transition-all

                  ${
                    active
                      ? `
                      bg-gradient-to-r
                      from-[#511D43]
                      to-[#901E3E]
                      text-white
                      shadow-lg
                    `
                      : `
                      text-slate-600
                      hover:bg-slate-100
                    `
                  }
                `}
                >
                  <Icon size={18} />

                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}

        <div
          className="
        min-h-[500px]
      "
        >
          {activeTab === "posts" && <KnowledgePosts />}

          {activeTab === "categories" && <KnowledgeCategories />}

          {activeTab === "questions" && <KnowledgeQuestions />}

          {activeTab === "analytics" && <KnowledgeAnalytics />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeCenter;
