import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api, { getCurrentUser } from "../../api"; // yoki "../../api"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleRes = await api.get(`/articles/${id}`);
        const data = articleRes.data;
        setArticle(data);

        const userId = await getCurrentUser();
        if (userId && data.user.id === userId) {
          setIsAuthor(true);
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) {
          navigate("/articles", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!confirm("Maqolani o‘chirishni xohlaysizmi?")) return;

    try {
      await api.delete(`/articles/${id}`);
      navigate("/articles");
    } catch (err) {
      alert("O‘chirishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F5F5F4] to-white">
        <div className="text-2xl font-bold text-gray-700 animate-pulse">
          Maqola yuklanmoqda...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#F5F5F4] to-white">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Maqola topilmadi
        </h2>
        <Link
          to="/articles"
          className="text-green-700 hover:text-green-900 font-semibold underline"
        >
          Barcha maqolalar
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F4] via-white to-[#F5F5F4] py-12 px-6 lg:px-[120px]">
      <div className="max-w-5xl mx-auto">
        {/* Orqaga tugmasi */}
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold text-lg mb-10 transition-all hover:scale-105"
        >
          Barcha maqolalar
        </Link>

        {/* Maqola kartasi */}
        <article className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
          {/* Rasm */}
          {article.image && (
            <div className="relative group">
              <img
                src={`http://127.0.0.1:8000/storage/${article.image}`}
                alt={article.title}
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Matn */}
          <div className="p-8 lg:p-12">
            {/* Sarlavha */}
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Muallif + Sana */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {article.user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-gray-800">
                  {article.user.name}
                </span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span className="font-medium">
                {new Date(article.created_at).toLocaleDateString("uz-UZ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Markdown matn */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <div className="my-8 -mx-8 lg:-mx-12">
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-2xl overflow-x-auto shadow-xl"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code
                        className="bg-gradient-to-r from-gray-100 to-gray-200 text-red-700 px-3 py-1 rounded-lg text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => (
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-10 mb-5">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-8 mb-4">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 ml-4">
                      {children}
                    </ul>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-green-600 pl-6 italic text-gray-600 my-8 bg-green-50 py-4 rounded-r-xl">
                      {children}
                    </blockquote>
                  ),
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 font-semibold hover:underline hover:text-green-900 transition"
                    >
                      {children} →
                    </a>
                  ),
                }}
              >
                {article.content || "*Matn yo‘q*"}
              </ReactMarkdown>
            </div>

            {/* MUALLIF TUGMALARI */}
            {isAuthor && (
              <div className="flex flex-col sm:flex-row gap-4 mt-16 pt-8 border-t border-gray-200">
                <Link
                  to={`/articles/edit/${id}`}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all transform hover:scale-105"
                >
                  Tahrirlash
                </Link>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all transform hover:scale-105"
                >
                  O‘chirish
                </button>
              </div>
            )}
          </div>
        </article>

        {/* Qo‘shimcha ma'lumot */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Maqola #{id} • Oxirgi yangilanish:{" "}
          {new Date(article.updated_at || article.created_at).toLocaleString(
            "uz-UZ"
          )}
        </div>
      </div>
    </div>
  );
};
