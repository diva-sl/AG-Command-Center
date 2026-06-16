import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";

import { useGetTransactionByIdQuery } from "../../redux/services/transactionApi";

const TransactionDetails = () => {
  const { id } = useParams();

  const { data: txn, isLoading } = useGetTransactionByIdQuery(id);

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  if (!txn) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center">Transaction not found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 -m-6 p-4 md:p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/transactions"
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              bg-white
              border
              rounded-xl
              shadow-sm
              text-[#511D43]
              hover:bg-[#511D43]
              hover:text-white
              transition
            "
          >
            ← Back to Transactions
          </Link>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-3xl border shadow-sm p-6 md:p-8 mb-6">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-[#511D43]">
                Transaction Details
              </h1>

              <p className="text-slate-500 mt-2">
                View payment information and transaction records.
              </p>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-sm text-slate-500">Amount</p>

              <h2 className="text-4xl font-bold text-green-600 mt-1">
                ₹{txn.amount}
              </h2>

              <span
                className={`
                  inline-flex mt-3 px-4 py-2 rounded-full text-sm font-medium
                  ${
                    txn.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {txn.status}
              </span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Customer</p>

            <h3 className="font-semibold text-[#511D43] mt-2">
              {txn.user?.name || "-"}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Plan</p>

            <h3 className="font-semibold capitalize mt-2">
              {txn.planName || "-"}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-5 border shadow-sm">
            <p className="text-sm text-slate-500">Date</p>

            <h3 className="font-semibold mt-2">
              {new Date(txn.createdAt).toLocaleDateString()}
            </h3>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Customer Info */}
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#511D43] mb-5">
              Customer Information
            </h2>

            <div className="space-y-4">
              <Info label="Customer Name" value={txn.user?.name} />

              <Info label="Email Address" value={txn.user?.email} />
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#511D43] mb-5">
              Payment Information
            </h2>

            <div className="space-y-4">
              <Info label="Payment ID" value={txn.razorpay_payment_id} />

              <Info label="Order ID" value={txn.razorpay_order_id} />

              <Info label="Status" value={txn.status} />

              <Info label="Amount" value={`₹${txn.amount}`} />
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-3xl border shadow-sm p-6 mt-6">
          <h2 className="text-xl font-semibold text-[#511D43] mb-5">
            Transaction Metadata
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Info label="Plan" value={txn.planName} />

            <Info label="Status" value={txn.status} />

            <Info
              label="Created At"
              value={new Date(txn.createdAt).toLocaleString()}
            />

            <Info label="Transaction Amount" value={`₹${txn.amount}`} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const Info = ({ label, value }) => (
  <div className="bg-slate-50 border rounded-2xl p-4">
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>

    <p className="font-semibold mt-2 break-all">{value || "-"}</p>
  </div>
);

export default TransactionDetails;
