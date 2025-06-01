import { BsBackpack } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FaHome, FaRegQuestionCircle } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GiTrophyCup } from "react-icons/gi";
import { LuCrown } from "react-icons/lu";
import { TbPlayCard } from "react-icons/tb";

export const menuItems = [
  {
    icon: <FaHome size={30} />,
    section: "Основное",
    text: "Главная",
    path: "/",
  },
  {
    icon: <GiTrophyCup size={30} />,
    section: "Основное",
    text: "Турниры",
    path: "/tournaments",
  },
  {
    icon: <FaArrowTrendUp size={30} />,
    section: "Основное",
    text: "Рейтинг",
    path: "/rating",
  },
  {
    icon: <LuCrown size={30} />,
    section: "Основное",
    text: "Мои ставки",
    path: "/stavki",
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
    icon: <FaRegQuestionCircle size={30} />,
    section: "Вспомогательное",
    text: "Поддержка",
    path: "/support",
  },
  {
    icon: <CiSettings size={30} />,
    section: "Вспомогательное",
    text: "Настройки",
    path: "/settings",
  },
  {
    icon: <FaRegQuestionCircle size={30} />,
    section: "Вспомогательное",
    text: "Поддержка",
    path: "/support",
  },
  {
    icon: <CiSettings size={30} />,
    section: "Вспомогательное",
    text: "Настройки",
    path: "/settings",
  },
  {
    icon: <FaRegQuestionCircle size={30} />,
    section: "Вспомогательное",
    text: "Поддержка",
    path: "/support",
  },
  {
    icon: <CiSettings size={30} />,
    section: "Вспомогательное",
    text: "Настройки",
    path: "/settings",
  },
  {
    icon: <FaRegQuestionCircle size={30} />,
    section: "Вспомогательное",
    text: "Поддержка",
    path: "/support",
  },
  {
    icon: <CiSettings size={30} />,
    section: "Вспомогательное",
    text: "Настройки",
    path: "/settings",
  },
];
