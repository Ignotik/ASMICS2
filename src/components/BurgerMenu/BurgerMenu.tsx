import React from "react";
import "./BurgerMenu.css";
import logo from "../../assets/FEFEFE.png";
import { LuCrown } from "react-icons/lu";
import { GiTrophyCup } from "react-icons/gi";
import { AiOutlineAim } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsBackpack } from "react-icons/bs";
import { TbPlayCard } from "react-icons/tb";

interface BurgerMenuProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuItems = [
  {
    icon: <FaHome size={30} />,
    section: "Основное",
    text: "Главная",
    path: "/",
  },
  {
    icon: <LuCrown size={30} />,
    section: "Основное",
    text: "Мои ставки",
    path: "/stavki",
  },
  {
    icon: <AiOutlineAim size={30} />,
    section: "Основное",
    text: "Статистика",
    path: "/statistic",
  },
  {
    icon: <GiTrophyCup size={30} />,
    section: "Основное",
    text: "Рейтинг",
    path: "/rating",
  },
  {
    icon: <CiSettings size={30} />,
    section: "Основное",
    text: "FAQ",
    path: "/faq",
  },
  {
    icon: <TbPlayCard size={30} />,
    section: "Asmi-cards",
    text: "Магазин карточек",
    path: "/cards",
  },
  {
    icon: <BsBackpack size={30} />,
    section: "Asmi-cards",
    text: "Мои карточки",
    path: "/my-cards",
  },
  {
    icon: <CiSettings size={30} />,
    section: "Asmi-cards",
    text: "FAQ",
    path: "/faq-cards",
  },
];

const BurgerMenu: React.FC<BurgerMenuProps> = ({ setIsOpen }) => {
  // Группируем элементы по секциям
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <section className="flex flex-col items-center z-10 absolute top-0 left-0 right-0 bottom-0 p-4 bg-gray-800 burger-menu">
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

      <div className="flex flex-col gap-6 w-full overflow-y-auto">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="flex flex-col gap-2">
            <h3 className="text-gray-400 text-sm uppercase font-bold px-2">
              {section}
            </h3>
            <div className="flex flex-col gap-1">
              {items.map((item, index) => (
                <Link
                  key={`${section}-${index}`}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-300">{item.icon}</span>
                  <span className="text-gray-100">{item.text}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BurgerMenu;
