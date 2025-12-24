import { useState } from "react";
import { Header } from "../../components/header";
import api from "../../api"; // YANGI QATOR
import { useNavigate } from "react-router-dom"; // YANGI QATOR

export const Register = () => {
  const navigate = useNavigate(); // YANGI

  // State qo‘shish
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date_of_birth: "",
    gender: "erkak", // default
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Input o‘zgarishini kuzatish
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Radio button uchun
  const handleGenderChange = (e) => {
    setFormData((prev) => ({ ...prev, gender: e.target.value }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/register", formData);

      // Tokenni saqlash
      localStorage.setItem("token", res.data.access_token);

      // Muvaffaqiyatli bo‘lsa – profile ga o‘tish
      navigate("/profile"); // yoki '/dashboard'
    } catch (err) {
      // Xatolikni chiroyli ko‘rsatish
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(", ")
        : err.response?.data?.error || "Xatolik yuz berdi";
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
          <h1 className="text-4xl mb-15">Register</h1>

          {/* Xatolik chiqsa */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
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
                <span>Name:</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-[50px] border border-[#878787] rounded px-3"
                  placeholder="To'liq ismingizni kiriting:"
                />
              </div>

              <div className="flex flex-col">
                <span>Birth of date:</span>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                  className="h-[50px] border border-[#878787] rounded px-3"
                />
              </div>

              <div className="flex flex-col">
                <span>Jins:</span>
                <div className="flex gap-10">
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="jins"
                      value="erkak"
                      checked={formData.gender === "erkak"}
                      onChange={handleGenderChange}
                    />{" "}
                    Erkak
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="jins"
                      value="ayol"
                      checked={formData.gender === "ayol"}
                      onChange={handleGenderChange}
                    />{" "}
                    Ayol
                  </div>
                </div>
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

              <div className="flex flex-col">
                <span>Verify password:</span>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                  className="h-[50px] border border-[#878787] rounded px-3"
                  placeholder="Parolingizni tasdiqlang:"
                />
              </div>

              <input
                type="submit"
                disabled={loading}
                className="bg-green-900 text-white h-[50px] rounded cursor-pointer hover:bg-green-800 disabled:opacity-50"
                value={loading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
