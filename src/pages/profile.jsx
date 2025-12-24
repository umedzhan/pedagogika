import { useEffect, useState } from "react";
import { Header } from "../components/header";
import mask_group from "../assets/images/mask_group.png";
import api from "../api"; // yoki "../../api"
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data);
      } catch (err) {
        setError("Ma'lumotlar yuklanmadi. Qayta kirishga urining.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUser();
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.log("Logout xatosi (muhim emas)");
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="px-[120px] bg-[#F5F5F4] min-h-screen">
        <Header />

        {/* Bo'sh joy (sizda h-200 bor edi) */}
        <div className="flex items-center h-52"></div>

        {loading && (
          <div className="text-center text-xl text-gray-600">
            Yuklanmoqda...
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {user && !loading && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header qismi - rasm bilan */}
            <div className="relative h-48 bg-linear-to-r from-green-800 to-green-900">
              <img
                src={mask_group}
                alt="Profile background"
                className="absolute bottom-0 right-10 w-48 h-48 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Profil ma'lumotlari */}
            <div className="px-10 pb-10 -mt-20">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                  Shaxsiy ma'lumotlar
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
                  <div>
                    <span className="font-semibold text-gray-600">Ism:</span>
                    <p className="text-gray-800 mt-1 text-xl">{user.name}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-600">Email:</span>
                    <p className="text-gray-800 mt-1 text-xl">{user.email}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-600">
                      Tug‘ilgan sana:
                    </span>
                    <p className="text-gray-800 mt-1 text-xl">
                      {new Date(user.date_of_birth).toLocaleDateString("uz-UZ")}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-600">Jins:</span>
                    <p className="text-gray-800 mt-1 text-xl capitalize">
                      {user.gender === "erkak" ? "Erkak" : "Ayol"}
                    </p>
                  </div>
                </div>

                <div className="mt-10 text-center">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-xl transition transform hover:scale-105 shadow-lg"
                  >
                    Chiqish
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
