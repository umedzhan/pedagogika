import { Header } from "../components/header";
import mask_group from "../assets/images/mask_group.png";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="px-[120px] bg-[#F5F5F4]">
        <Header />
        <div className="flex items-center h-200">
          <div className="flex flex-col gap-9 w-[50%]">
            <div className="flex flex-col gap-5">
              <div className="font-bold text-[64px]">
                Pedagogik <span className="text-green-800">mahorat</span>ingizni
                va <span className="text-green-800">ko'nikma</span>laringizni
                oshiring
              </div>
              <div className="text-[#646464]">
                Learn UI-UX Design skills with weekend UX . The latest online
                learning system and material that help your knowledge growing.
              </div>
            </div>
            <div className="flex gap-7">
              <Link
                to="/login"
                className="py-4 w-[200px] text-center items-center bg-green-800 text-white rounded-lg"
              >
                Kirish
              </Link>
              <Link
                to="/register"
                className="py-4 w-[200px] text-center bg-green-100 text-green-700 rounded-lg"
              >
                Ro'yxatdan o'tish
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center w-[50%]">
            <div>
              <img className="rounded-full bg-green-950" src={mask_group} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
