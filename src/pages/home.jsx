import { Header } from "../components/header";
import mask_group from "../assets/images/mask_group.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api"; // yoki "../../api"

export const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        // /me endpoint orqali token haqiqiy ekanligini tekshirish
        await api.get("/me");
        setIsLoggedIn(true);
      } catch (err) {
        // Token eskirgan yoki noto‘g‘ri
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // yoki sahifani yangilash
  };

  return (
    <>
      <div className="px-[120px] bg-[#F5F5F4] min-h-screen">
        <Header />

        <div className="flex items-center h-[80vh]">
          <div className="flex flex-col gap-9 w-[50%]">
            <div className="flex flex-col gap-5">
              <div className="font-bold text-[64px] leading-tight">
                Pedagogik <span className="text-green-800">mahorat</span>ingizni
                va <span className="text-green-800">ko'nikma</span>laringizni
                oshiring
              </div>
              <div className="text-[#646464] text-lg">
                Learn UI-UX Design skills with weekend UX. The latest online
                learning system and material that help your knowledge growing.
              </div>
            </div>

            {/* TUGMALAR – LOGIN HOLATIGA QARAB O‘ZGARADI */}
            <div className="flex gap-7">
              {loading ? (
                <div className="py-4 px-8 bg-gray-300 text-gray-600 rounded-lg animate-pulse">
                  Yuklanmoqda...
                </div>
              ) : isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="py-4 w-[200px] text-center bg-green-800 hover:bg-green-900 text-white rounded-lg transition font-semibold shadow-lg"
                  >
                    Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-4 w-[200px] text-center bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold shadow-lg"
                  >
                    Chiqish
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="py-4 w-[200px] text-center bg-green-800 hover:bg-green-900 text-white rounded-lg transition font-semibold shadow-lg"
                  >
                    Kirish
                  </Link>
                  <Link
                    to="/register"
                    className="py-4 w-[200px] text-center bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition font-semibold shadow-lg"
                  >
                    Ro'yxatdan o'tish
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Rasm */}
          <div className="flex items-center justify-center w-[50%]">
            <div className="relative">
              <img
                className="rounded-full w-[500px] h-[500px] object-cover shadow-2xl border-8 border-white"
                src={mask_group}
                alt="Pedagogika"
              />
              <div className="absolute inset-0 rounded-full bg-linear-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
