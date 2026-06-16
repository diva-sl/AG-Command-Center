import { useEffect, useState } from "react";

import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../redux/services/settingsApi";

const SocialSettings = () => {
  const { data } = useGetSettingsQuery();

  const [updateSettings] = useUpdateSettingsMutation();

  const [form, setForm] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    whatsapp: "",
    googleBusiness: "",
    telegram: "",
  });

  useEffect(() => {
    if (data?.social) {
      setForm(data.social);
    }
  }, [data]);

  const saveHandler = async () => {
    await updateSettings({
      social: form,
    }).unwrap();

    alert("Social settings updated");
  };

  return (
    <div className="bg-white rounded-3xl p-6 border">
      <h2 className="font-bold text-xl mb-6">Social Media Settings</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          placeholder="Facebook URL"
          value={form.facebook}
          onChange={(e) =>
            setForm({
              ...form,
              facebook: e.target.value,
            })
          }
          className="border rounded-xl p-3"
        />

        <input
          placeholder="Instagram URL"
          value={form.instagram}
          onChange={(e) =>
            setForm({
              ...form,
              instagram: e.target.value,
            })
          }
          className="border rounded-xl p-3"
        />

        <input
          placeholder="LinkedIn URL"
          value={form.linkedin}
          onChange={(e) =>
            setForm({
              ...form,
              linkedin: e.target.value,
            })
          }
          className="border rounded-xl p-3"
        />

        <input
          placeholder="Twitter/X URL"
          value={form.twitter}
          onChange={(e) =>
            setForm({
              ...form,
              twitter: e.target.value,
            })
          }
          className="border rounded-xl p-3"
        />

        <input
          placeholder="YouTube URL"
          value={form.youtube}
          onChange={(e) =>
            setForm({
              ...form,
              youtube: e.target.value,
            })
          }
          className="border rounded-xl p-3"
        />

        <input
          placeholder="WhatsApp URL"
          value={form.whatsapp}
          onChange={(e) =>
            setForm({
              ...form,
              whatsapp: e.target.value,
            })
          }
          className="border rounded-xl p-3"
        />

        <input
          placeholder="Google Business Profile"
          value={form.googleBusiness}
          onChange={(e) =>
            setForm({
              ...form,
              googleBusiness: e.target.value,
            })
          }
          className="border rounded-xl p-3"
        />

        <input
          placeholder="Telegram URL"
          value={form.telegram}
          onChange={(e) =>
            setForm({
              ...form,
              telegram: e.target.value,
            })
          }
          className="border rounded-xl p-3"
        />
      </div>

      <button
        onClick={saveHandler}
        className="mt-6 bg-[#511D43] text-white px-6 py-3 rounded-xl"
      >
        Save Social Settings
      </button>
    </div>
  );
};

export default SocialSettings;
