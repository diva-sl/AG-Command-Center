import { useEffect, useState } from "react";

import { useAnswerQuestionMutation } from "../../redux/services/knowledgeApi";

const QuestionAnswerModal = ({ open, onClose, question }) => {
  const [answer, setAnswer] = useState("");

  const [answerQuestion, { isLoading }] = useAnswerQuestionMutation();

  useEffect(() => {
    if (question?.answer) {
      setAnswer(question.answer);
    } else {
      setAnswer("");
    }
  }, [question]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await answerQuestion({
        id: question._id,
        answer,
      }).unwrap();

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!open || !question) return null;

  return (
    <div
      className="
      fixed inset-0 z-50
      bg-black/60
      backdrop-blur-sm
      flex items-center
      justify-center
      p-4
    "
    >
      <div
        className="
        bg-white
        rounded-3xl
        w-full
        max-w-3xl
        overflow-hidden
        shadow-2xl
      "
      >
        {/* Header */}

        <div
          className="
          bg-gradient-to-r
          from-[#511D43]
          to-[#901E3E]
          text-white
          p-6
        "
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Answer Question</h2>

              <p className="text-white/80 text-sm">
                Knowledge Center Community Support
              </p>
            </div>

            <button
              onClick={onClose}
              className="
              w-10 h-10
              rounded-full
              hover:bg-white/20
            "
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}

        <form onSubmit={submitHandler} className="p-6 space-y-6">
          {/* User Info */}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-500">Name</label>

              <div className="mt-1 border rounded-xl p-3 bg-slate-50">
                {question.name}
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-500">Email</label>

              <div className="mt-1 border rounded-xl p-3 bg-slate-50">
                {question.email}
              </div>
            </div>
          </div>

          {/* Article */}

          <div>
            <label className="text-sm text-slate-500">Article</label>

            <div className="mt-1 border rounded-xl p-3 bg-slate-50">
              {question.post?.title}
            </div>
          </div>

          {/* Question */}

          <div>
            <label className="text-sm text-slate-500">Visitor Question</label>

            <div
              className="
              mt-1
              border
              rounded-xl
              p-4
              bg-slate-50
            "
            >
              {question.question}
            </div>
          </div>

          {/* Answer */}

          <div>
            <label
              className="
              block
              mb-2
              font-medium
              text-[#511D43]
            "
            >
              Your Answer
            </label>

            <textarea
              rows={8}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write a professional response..."
              className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-[#901E3E]
            "
              required
            />
          </div>

          {/* Footer */}

          <div
            className="
            border-t
            pt-5
            flex
            justify-end
            gap-3
          "
          >
            <button
              type="button"
              onClick={onClose}
              className="
              px-6
              py-3
              border
              rounded-xl
            "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="
              px-6
              py-3
              rounded-xl
              text-white
              bg-gradient-to-r
              from-[#511D43]
              to-[#901E3E]
            "
            >
              {question.answer ? "Update Answer" : "Submit Answer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionAnswerModal;
