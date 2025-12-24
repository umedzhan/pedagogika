import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api"; // yoki "../../api"

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/me");
        setIsLoggedIn(true);
        setUserName(res.data.name.split(" ")[0]); // faqat ism
      } catch (err) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.log("Logout xatosi");
    } finally {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <div className="flex gap-5 py-7 text-sm">
      <div className="flex justify-between w-full">
        {/* Logo + Qidiruv + Menu */}
        <div className="flex gap-[30px]">
          <div className="flex gap-[55px] items-center">
            <Link to="/">
              <img className="w-20 h-20 cursor-pointer" src={logo} alt="Logo" />
            </Link>
            <input
              className="w-[367px] h-11 border-2 rounded-lg border-[#20B486] px-4 py-2 focus:outline-none focus:border-[#1a8f6b] transition"
              placeholder="Qidirish"
              type="search"
            />
          </div>

          <div className="flex gap-8 items-center font-semibold text-gray-700">
            <Link to="/" className="hover:text-[#20B486] transition">
              Bosh sahifa
            </Link>
            <Link to="/about" className="hover:text-[#20B486] transition">
              Haqimizda
            </Link>
            <Link
              to="/articles"
              className="cursor-pointer hover:text-[#20B486] transition"
            >
              Maqolalar
            </Link>
            <span className="cursor-pointer hover:text-[#20B486] transition">
              Aloqa
            </span>
            <span className="cursor-pointer hover:text-[#20B486] transition">
              FAQ's
            </span>
          </div>
        </div>

        {/* O‘NG TUGMALAR – LOGIN HOLATIGA QARAB O‘ZGARADI */}
        <div className="flex gap-5 items-center font-medium">
          {loading ? (
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          ) : isLoggedIn ? (
            <>
              {/* Profil */}
              <Link
                to="/profile"
                className="flex items-center gap-3 px-5 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-semibold shadow"
              >
                <span className="text-2xl">Profile</span>
                <span>{userName}</span>
              </Link>

              {/* Chiqish */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition font-semibold shadow-lg"
              >
                Chiqish
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-[#20B486] transition font-semibold"
              >
                Kirish
              </Link>
              <Link
                to="/register"
                className="bg-[#20B486] hover:bg-[#1a8f6b] rounded-lg w-[167px] h-10 flex justify-center items-center text-sm font-semibold text-white transition shadow-lg"
              >
                Ro'yxatdan o'tish
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
