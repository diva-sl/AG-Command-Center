import { useMemo, useState } from "react";

import {
  Search,
  MessageSquare,
  CheckCircle,
  Clock,
  Trash2,
  MessageCircleReply,
} from "lucide-react";

import {
  useGetQuestionsQuery,
  useApproveQuestionMutation,
  useDeleteQuestionMutation,
} from "../../redux/services/knowledgeApi";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import ConfirmModal from "../../components/common/ConfirmModal";

import QuestionAnswerModal from "./QuestionAnswerModal";

const KnowledgeQuestions = () => {
  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState(null);

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [answerModal, setAnswerModal] = useState(false);

  const { data, isLoading } = useGetQuestionsQuery();

  const [approveQuestion] = useApproveQuestionMutation();

  const [deleteQuestion] = useDeleteQuestionMutation();

  const questions = data?.data || [];

  const filteredQuestions = useMemo(() => {
    return questions.filter(
      (item) =>
        item.question?.toLowerCase().includes(search.toLowerCase()) ||
        item.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [questions, search]);

  const stats = {
    total: questions.length,

    approved: questions.filter((q) => q.approved).length,

    pending: questions.filter((q) => !q.approved).length,

    answered: questions.filter((q) => q.answer).length,
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(deleteId).unwrap();

      setDeleteId(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Total Questions" value={stats.total} />

        <StatCard title="Approved" value={stats.approved} />

        <StatCard title="Pending" value={stats.pending} />

        <StatCard title="Answered" value={stats.answered} />
      </div>

      {/* Search */}

      <div className="bg-white border rounded-3xl p-5">
        <div className="relative">
          <Search
            size={18}
            className="
            absolute
            left-4
            top-4
            text-slate-400
          "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="
              w-full
              border
              rounded-xl
              py-3
              pl-11
              pr-4
            "
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white border rounded-3xl overflow-hidden">
        {filteredQuestions.length === 0 ? (
          <EmptyState
            title="No Questions Found"
            description="Questions from visitors will appear here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="p-4 text-left">User</th>

                  <th className="p-4 text-left">Article</th>

                  <th className="p-4 text-left">Question</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredQuestions.map((question) => (
                  <tr key={question._id} className="border-b">
                    <td className="p-4">
                      <div>
                        <h4 className="font-medium">{question.name}</h4>

                        <p className="text-xs text-slate-500">
                          {question.email}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">{question.post?.title}</td>

                    <td className="p-4 max-w-md">
                      <p className="line-clamp-3">{question.question}</p>

                      {question.answer && (
                        <div
                          className="
                            mt-2
                            text-sm
                            text-green-700
                          "
                        >
                          Answered
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      {question.approved ? (
                        <span
                          className="
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            bg-green-100
                            text-green-700
                          "
                        >
                          Approved
                        </span>
                      ) : (
                        <span
                          className="
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            bg-yellow-100
                            text-yellow-700
                          "
                        >
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        {!question.approved && (
                          <button
                            onClick={() => approveQuestion(question._id)}
                            className="
                              p-2
                              border
                              rounded-lg
                              text-green-600
                            "
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setSelectedQuestion(question);

                            setAnswerModal(true);
                          }}
                          className="
                            p-2
                            border
                            rounded-lg
                            text-blue-600
                          "
                        >
                          <MessageCircleReply size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteId(question._id)}
                          className="
                            p-2
                            border
                            rounded-lg
                            text-red-600
                          "
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <QuestionAnswerModal
        open={answerModal}
        onClose={() => setAnswerModal(false)}
        question={selectedQuestion}
      />

      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Question"
        description="Are you sure you want to delete this question?"
      />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white border rounded-2xl p-5">
    <p className="text-sm text-slate-500">{title}</p>

    <h3 className="text-2xl font-bold text-[#511D43] mt-2">{value}</h3>
  </div>
);

export default KnowledgeQuestions;
