import React from "react";
import "./BurgerMenu.css";
import logo from "../../assets/FEFEFE.png";
import { LuCrown } from "react-icons/lu";
import { GiTrophyCup } from "react-icons/gi";
import { AiOutlineAim } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

interface BurgerMenuProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItems = [
  { icon: <FaHome size={30} />, text: "Главная", path: "/" },
  { icon: <LuCrown size={30} />, text: "Мои ставки", path: "/stavki" },
  { icon: <AiOutlineAim size={30} />, text: "Статистика", path: "/statistic" },
  { icon: <GiTrophyCup size={30} />, text: "Рейтинг", path: "/rating" },
  { icon: <CiSettings size={30} />, text: "FAQ", path: "/faq" },
];

const BurgerMenu: React.FC<BurgerMenuProps> = ({ setIsOpen }) => {
  return (
    <section className="flex flex-col items-center absolute top-0 left-0 right-0 bottom-0 p-4 bg-gray-800 burger-menu">
      <div className="flex items-center justify-between w-full mb-4">
        <div onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <p
          className="w-8 h-8 flex items-center justify-center rounded-full border border-white cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          X
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {menuItems.map((item, index) => (
          <Link
            to={`${item.path}`}
            onClick={() => setIsOpen(false)}
            className="flex nav items-center gap-2"
          >
            {item.icon}
            <p key={index} className=" text-lg my-2">
              {item.text}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BurgerMenu;
