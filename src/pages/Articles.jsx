import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { Header } from "../components/header";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/articles")
      .then((res) => setArticles(res.data))
      .catch(() => alert("Maqolalar yuklanmadi"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="px-[120px] bg-[#F5F5F4]">
        <Header />
      </div>
      <div className="px-[120px] py-10 bg-[#F5F5F4] min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Maqolalar</h1>
          {localStorage.getItem("token") && (
            <Link
              to="/articles/create"
              className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-900"
            >
              + Yangi maqola
            </Link>
          )}
        </div>

        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {article.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${article.image}`}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Muallif: {article.user.name}
                  </p>
                  <p
                    className="text-gray-700 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: article.content_html }}
                  ></p>
                  <Link
                    to={`/articles/${article.id}`}
                    className="text-green-700 font-semibold mt-4 inline-block hover:underline"
                  >
                    Batafsil →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
