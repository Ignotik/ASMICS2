import { BsBackpack } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FaHome, FaRegQuestionCircle } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GiTrophyCup } from "react-icons/gi";
import { GoGift } from "react-icons/go";
import { LuCrown } from "react-icons/lu";
import { MdOutlineShield } from "react-icons/md";
import { TbPlayCard } from "react-icons/tb";

export const menuItems = [
  {
    icon: <FaHome size={30} />,
    section: "Основное",
    text: "Главная",
    path: "/",
    access: "all",
  },
  {
    icon: <GiTrophyCup size={30} />,
    section: "Основное",
    text: "Турниры",
    path: "/tournaments",
    access: "all",
  },
  {
    icon: <FaArrowTrendUp size={30} />,
    section: "Основное",
    text: "Рейтинг",
    path: "/rating",
    access: "all",
  },
  {
    icon: <LuCrown size={30} />,
    section: "Основное",
    text: "Мои ставки",
    path: "/stavki",
    access: "all",
  },

  {
    icon: <TbPlayCard size={30} />,
    section: "Asmi-cards",
    text: "Магазин карточек",
    path: "/cards",
    access: "all",
  },
  {
    icon: <BsBackpack size={30} />,
    section: "Asmi-cards",
    text: "Мои карточки",
    path: "/my-cards",
    access: "all",
  },
  {
    icon: <FaRegQuestionCircle size={30} />,
    section: "Вспомогательное",
    text: "Поддержка",
    path: "/support",
    access: "all",
  },
  {
    icon: <CiSettings size={30} />,
    section: "Вспомогательное",
    text: "Настройки",
    path: "/settings",
    access: "all",
  },
  {
    icon: <GoGift size={30} />,
    section: "Основное",
    text: "Бонусы",
    path: "/bonus",
    access: "all",
  },
  {
    icon: <MdOutlineShield size={30} />,
    section: "Вспомогательное",
    text: "Админ-панель",
    path: "/admin",
    access: "admin",
  },
];
