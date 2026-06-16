const SystemSettings = () => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="bg-white rounded-3xl border p-6">
        <h4 className="text-slate-500 text-sm">Environment</h4>

        <p className="font-bold text-lg text-green-600">Production</p>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <h4 className="text-slate-500 text-sm">Backend Status</h4>

        <p className="font-bold text-lg text-green-600">Running</p>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <h4 className="text-slate-500 text-sm">MongoDB</h4>

        <p className="font-bold text-lg text-green-600">Connected</p>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <h4 className="text-slate-500 text-sm">Cloudinary</h4>

        <p className="font-bold text-lg text-green-600">Connected</p>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <h4 className="text-slate-500 text-sm">Razorpay</h4>

        <p className="font-bold text-lg text-green-600">Connected</p>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <h4 className="text-slate-500 text-sm">Website</h4>

        <p className="font-medium">agandassociates.org</p>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <h4 className="text-slate-500 text-sm">Admin Panel</h4>

        <p className="font-medium">admin.agandassociates.org</p>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <h4 className="text-slate-500 text-sm">Version</h4>

        <p className="font-bold text-lg">v1.0.0</p>
      </div>
    </div>
  );
};

export default SystemSettings;
