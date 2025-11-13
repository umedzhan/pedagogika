import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex gap-5 py-7 text-sm ">
      <div className="flex justify-between w-full">
        <div className="flex gap-[30px]">
          <div className="flex gap-[55px] items-center">
            <img className="w-20 h-20" src={logo} />
            <input
              className="w-[367px] h-11 border-2 rounded-lg border-[#20B486] px-2 py-2"
              placeholder="Qidirish"
              type="search"
            />
          </div>
          <div className="flex gap-5 items-center font-semibold">
            <Link to="/">Bosh sahifa</Link>
            <Link to="/about">Haqimizda</Link>
            <span>Maqolalar</span>
            <span>Aloqa</span>
            <span>FAQ's</span>
          </div>
        </div>
        <div className="flex gap-5 items-center font-medium">
          <Link to="/login">Kirish</Link>
          <Link
            to="/register"
            className="bg-[#20B486] rounded-lg w-[167px] h-10 flex justify-center items-center text-sm font-semibold"
          >
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  );
};
