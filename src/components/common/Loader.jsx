const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      {/* Outer Glow */}
      <div className="relative">
        <div
          className="
            absolute
            inset-0
            rounded-full
            blur-xl
            bg-gradient-to-r
            from-[#511D43]
            to-[#901E3E]
            opacity-30
            animate-pulse
          "
        />

        {/* Spinner */}
        <div
          className="
            relative
            h-16
            w-16
            rounded-full
            border-[4px]
            border-[#901E3E]/20
            border-t-[#901E3E]
            border-r-[#511D43]
            animate-spin
          "
        />
      </div>

      {/* Text */}
      <div className="mt-6 text-center">
        <h3 className="font-semibold text-[#511D43]">AG Associates</h3>

        <p className="text-sm text-slate-500 mt-1">Loading Dashboard...</p>
      </div>
    </div>
  );
};

export default Loader;
