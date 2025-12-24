import { useState } from "react";
import api from "../../api"; // yoki "../../api"
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CreateArticle = () => {
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (form.image) formData.append("image", form.image);

    try {
      await api.post("/articles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/articles");
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.title?.[0] ||
        err.response?.data?.errors?.content?.[0] ||
        "Maqola saqlanmadi";
      alert("Xatolik: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-[120px] py-10 max-w-7xl mx-auto">
      {/* Sarlavha + Preview tugmasi */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Yangi maqola</h1>
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className={`px-5 py-2 rounded-lg font-medium transition ${
            preview
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {preview ? "Yozish" : "Ko‘rib chiqish"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 rounded-2xl shadow-xl"
      >
        {/* CHAP TARAF – EDITOR */}
        <div className={preview ? "hidden lg:block" : "block"}>
          {/* Sarlavha */}
          <input
            type="text"
            placeholder="Sarlavha kiriting..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-lg text-2xl font-bold focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
            required
          />

          {/* Matn (Markdown) */}
          <textarea
            placeholder={`# Sarlavhangiz\n\n**Qalin matn**, *kursiv*, ~~chizilgan~~\n\n- Ro‘yxat elementi\n\n\`\`\`js\nconsole.log("Salom, Markdown!");\n\`\`\``}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full p-4 mt-4 border border-gray-300 rounded-lg h-96 font-mono text-sm resize-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
            required
          />

          {/* Rasm yuklash */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rasm yuklash (ixtiyoriy)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700 transition"
            />
            {form.image && (
              <div className="mt-3 flex items-center gap-2 text-sm text-green-700">
                <span className="font-medium">{form.image.name}</span>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, image: null })}
                  className="text-red-600 hover:text-red-800"
                >
                  O‘chirish
                </button>
              </div>
            )}
          </div>
        </div>

        {/* O‘NG TARAF – PREVIEW */}
        <div
          className={`prose prose-lg max-w-none p-6 bg-gray-50 rounded-lg shadow-inner ${
            !preview ? "hidden lg:block" : "block"
          }`}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {form.title || "Sarlavha yo‘q"}
          </h1>

          {/* Yuklangan rasm preview */}
          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Yuklangan rasm"
              className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
            />
          )}

          {/* Markdown → HTML */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg overflow-x-auto"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-gray-200 text-red-700 px-2 py-1 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3">
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {children}
                </ul>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-600 my-4">
                  {children}
                </blockquote>
              ),
            }}
          >
            {form.content || "*Bu yerda matn ko‘rinadi...*"}
          </ReactMarkdown>
        </div>

        {/* TUGMALAR – PASTDA */}
        <div className="lg:col-span-2 flex justify-center gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105"
          >
            {loading ? "Saqlanmoqda..." : "Joylash"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/articles")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition transform hover:scale-105"
          >
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  );
};
