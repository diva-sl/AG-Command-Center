import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import GeneralSettings from "./GeneralSettings";
import SeoSettings from "./SeoSettings";
import SocialSettings from "./SocialSettings";
import LegalSettings from "./LegalSettings";
import SystemSettings from "./SystemSettings";

const tabs = [
  {
    id: "general",
    label: "General",
  },

  {
    id: "seo",
    label: "SEO",
  },

  {
    id: "social",
    label: "Social Media",
  },

  {
    id: "legal",
    label: "Legal Pages",
  },

  {
    id: "system",
    label: "System",
  },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings Center</h1>

        <p className="text-slate-500">
          Manage AG Associates website configuration
        </p>
      </div>

      <div className="bg-white rounded-3xl p-2 border shadow-sm mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-2xl font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#511D43] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "general" && <GeneralSettings />}

      {activeTab === "seo" && <SeoSettings />}

      {activeTab === "social" && <SocialSettings />}

      {activeTab === "legal" && <LegalSettings />}

      {activeTab === "system" && <SystemSettings />}
    </DashboardLayout>
  );
};

export default Settings;
