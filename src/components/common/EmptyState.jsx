import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "No Data Found",
  description = "Nothing to display",
}) => {
  return (
    <div className="bg-white rounded-2xl p-10 text-center">
      <Inbox size={60} className="mx-auto text-slate-400" />

      <h3 className="mt-4 text-xl font-semibold">{title}</h3>

      <p className="text-slate-500 mt-2">{description}</p>
    </div>
  );
};

export default EmptyState;
