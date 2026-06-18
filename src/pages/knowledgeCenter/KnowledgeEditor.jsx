import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Heading1,
  Heading2,
} from "lucide-react";
import { useEffect } from "react";

const KnowledgeEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    editorProps: {
      attributes: {
        class: "min-h-[400px] p-5 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-2xl overflow-hidden">
      {/* Toolbar */}

      <div className="border-b bg-slate-50 p-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="p-2 rounded-lg hover:bg-slate-200"
        >
          <Bold size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="p-2 rounded-lg hover:bg-slate-200"
        >
          <Italic size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded-lg ${
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-500 text-white"
              : "hover:bg-slate-200"
          }`}
        >
          <Heading1 size={18} />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded-lg ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-500 text-white"
              : "hover:bg-slate-200"
          }`}
        >
          <Heading2 size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="p-2 rounded-lg hover:bg-slate-200"
        >
          <List size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="p-2 rounded-lg hover:bg-slate-200"
        >
          <ListOrdered size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="p-2 rounded-lg hover:bg-slate-200"
        >
          <Quote size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded-lg hover:bg-slate-200"
        >
          <Undo2 size={18} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded-lg hover:bg-slate-200"
        >
          <Redo2 size={18} />
        </button>
      </div>

      {/* Editor */}

      <EditorContent editor={editor} />
    </div>
  );
};

export default KnowledgeEditor;
