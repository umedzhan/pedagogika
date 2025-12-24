import { useState } from "react";
import { Header } from "../../components/header";
import api from "../../api";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", formData);

      // Tokenni saqlash
      localStorage.setItem("token", res.data.access_token);

      // Muvaffaqiyatli bo‘lsa – profile yoki dashboard ga o‘tish
      navigate("/profile"); // yoki '/dashboard'
    } catch (err) {
      const msg = err.response?.data?.error
        ? err.response.data.error
        : err.response?.data?.message || "Email yoki parol noto‘g‘ri";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-30">
        <Header />
        <div className="p-5">
          <h1 className="text-4xl mb-15">Login</h1>

          {/* Xatolik xabari */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 w-[50%]">
              {error}
            </div>
          )}

          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-[50%] gap-6"
            >
              <div className="flex flex-col">
                <span>Email:</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-[50px] border border-[#878787] rounded px-3"
                  placeholder="Elektron pochtangizni kiriting:"
                />
              </div>

              <div className="flex flex-col">
                <span>Password:</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className="h-[50px] border border-[#878787] rounded px-3"
                  placeholder="Parolingizni kiriting:"
                />
              </div>

              <input
                type="submit"
                disabled={loading}
                className="bg-green-900 text-white h-[50px] rounded cursor-pointer hover:bg-green-800 disabled:opacity-50 transition"
                value={loading ? "Kirilmoqda..." : "Kirish"}
              />
            </form>

            {/* Register ga havola */}
            <p className="mt-6 text-gray-600 w-[50%]">
              Hisobingiz yo‘qmi?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Ro‘yxatdan o‘tish
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
