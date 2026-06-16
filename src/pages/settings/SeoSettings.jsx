const SeoSettings = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border">
      <h2 className="font-bold text-xl mb-6">SEO Settings</h2>

      <div className="space-y-4">
        <input
          placeholder="Meta Title"
          className="border rounded-xl p-3 w-full"
        />

        <textarea
          rows={4}
          placeholder="Meta Description"
          className="border rounded-xl p-3 w-full"
        />

        <textarea
          rows={3}
          placeholder="Keywords"
          className="border rounded-xl p-3 w-full"
        />
      </div>
    </div>
  );
};

export default SeoSettings;
