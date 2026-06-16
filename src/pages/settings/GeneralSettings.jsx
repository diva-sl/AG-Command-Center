const GeneralSettings = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border">
      <h2 className="font-bold text-xl mb-6">General Settings</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <input placeholder="Company Name" className="border rounded-xl p-3" />

        <input placeholder="Email" className="border rounded-xl p-3" />

        <input placeholder="Phone" className="border rounded-xl p-3" />

        <input placeholder="WhatsApp" className="border rounded-xl p-3" />

        <textarea
          rows={4}
          placeholder="Address"
          className="border rounded-xl p-3 md:col-span-2"
        />
      </div>
    </div>
  );
};

export default GeneralSettings;
