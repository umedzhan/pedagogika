import { useState, useEffect } from "react";
import api from "../../api"; // yoki "../../api"
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", content: "", image: null });
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    api
      .get(`/articles/${id}`)
      .then((res) => {
        const data = res.data;
        setForm({ title: data.title, content: data.content, image: null });
        setCurrentImage(data.image);
      })
      .catch(() => {
        alert("Maqola topilmadi");
        navigate("/articles");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("_method", "PUT");
    if (form.image) formData.append("image", form.image);

    try {
      await api.post(`/articles/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/articles/${id}`);
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.title?.[0] ||
        err.response?.data?.errors?.content?.[0] ||
        "Maqola saqlanmadi";
      alert("Xatolik: " + errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-2xl font-semibold text-gray-600">
          Yuklanmoqda...
        </div>
      </div>
    );

  return (
    <div className="px-[120px] py-10 max-w-7xl mx-auto">
      {/* Sarlavha + Preview tugmasi */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Maqola tahrirlash
        </h1>
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 shadow-md ${
            preview
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700"
          }`}
        >
          {preview ? "Yozish" : "Ko‘rib chiqish"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-2xl"
      >
        {/* CHAP TARAF – EDITOR */}
        <div className={preview ? "hidden lg:block" : "block"}>
          {/* Sarlavha */}
          <input
            type="text"
            placeholder="Sarlavha kiriting..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-5 border-2 border-gray-300 rounded-xl text-3xl font-bold focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
            required
          />

          {/* Markdown matn */}
          <textarea
            placeholder={`# Yangi sarlavha\n\n**Muhim** ma'lumotlar bu yerda.\n\n\`\`\`python\nprint("Markdown ishlaydi!")\n\`\`\``}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full p-5 mt-6 border-2 border-gray-300 rounded-xl h-96 font-mono text-sm resize-none focus:ring-4 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
            required
          />

          {/* Rasm yuklash */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Yangi rasm (ixtiyoriy)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="w-full p-4 border-2 border-dashed border-gray-400 rounded-xl file:mr-5 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-blue-700 file:text-white hover:file:from-blue-700 hover:file:to-blue-800 transition-all"
            />
            {currentImage && !form.image && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                Joriy rasm: <span className="font-bold">{currentImage}</span>
              </div>
            )}
            {form.image && (
              <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-sm font-medium text-blue-800 truncate">
                  {form.image.name}
                </span>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, image: null })}
                  className="text-red-600 hover:text-red-800 font-semibold text-sm"
                >
                  O‘chirish
                </button>
              </div>
            )}
          </div>
        </div>

        {/* O‘NG TARAF – PREVIEW */}
        <div
          className={`prose prose-lg max-w-none p-8 bg-white rounded-2xl shadow-inner border border-gray-200 transition-all duration-300 ${
            !preview ? "hidden lg:block" : "block"
          }`}
        >
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-tight">
            {form.title || "Sarlavha yo‘q"}
          </h1>

          {/* Joriy yoki yangi rasm */}
          {(currentImage && !form.image) || form.image ? (
            <img
              src={
                form.image
                  ? URL.createObjectURL(form.image)
                  : `http://127.0.0.1:8000/storage/${currentImage}`
              }
              alt="Rasm"
              className="w-full h-80 object-cover rounded-xl mb-8 shadow-lg"
            />
          ) : null}

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
                    className="rounded-xl overflow-x-auto my-6 shadow-md"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-linear-to-r from-gray-100 to-gray-200 text-red-700 px-3 py-1 rounded-lg text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              h1: ({ children }) => (
                <h1 className="text-3xl font-extrabold text-gray-800 mt-8 mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-700 mt-7 mb-3">
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-5 text-justify">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-700 mb-5 space-y-2 ml-4">
                  {children}
                </ul>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-600 pl-5 italic text-gray-600 my-6 bg-blue-50 py-3 rounded-r-lg">
                  {children}
                </blockquote>
              ),
            }}
          >
            {form.content || "*Bu yerda matn ko‘rinadi...*"}
          </ReactMarkdown>
        </div>

        {/* TUGMALAR – PASTDA */}
        <div className="lg:col-span-2 flex justify-center gap-6 mt-8">
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/articles/${id}`)}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all transform hover:scale-105"
          >
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  );
};
