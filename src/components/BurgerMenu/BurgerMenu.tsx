import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import "./BurgerMenu.css";
import logo from "../../assets/FEFEFE.png";
import { menuItems } from "../../utils/consts/burger";
import { Link } from "react-router-dom";
import { useUserStore } from "../../utils/store/UserStore";

interface BurgerMenuProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ setIsOpen, isOpen }) => {
  const { user } = useUserStore();
  const groupedItems = menuItems.reduce((acc, item) => {
    const hasAccess =
      item.access === "all" || (user && item.access.includes(user.role));

    if (hasAccess) {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }
      acc[item.section].push(item);
    }
    return acc;
  }, {} as Record<string, typeof menuItems>);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "tween",
              ease: [0.25, 0.1, 0.25, 1],
              duration: 0.3,
            }}
            className="fixed inset-0 z-50 bg-gray-800 overflow-hidden"
          >
            <div className="container mx-auto h-full flex flex-col p-6">
              {/* Шапка меню (фиксированная высота) */}
              <div className="flex items-center justify-between mb-8 h-12">
                <img src={logo} alt="Logo" className="h-full" />
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white text-white text-xl hover:bg-gray-700 transition-colors"
                  onClick={handleClose}
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>

              {/* Основной контент с прокруткой */}
              <div className="menu-scroll-container">
                <div className="grid gap-8">
                  {Object.entries(groupedItems).map(([section, items]) => (
                    <div key={section} className="mb-6">
                      <h3 className="text-gray-400 text-lg uppercase font-bold mb-4 px-2">
                        {section}
                      </h3>
                      <div className="grid gap-2">
                        {items.map((item, index) => (
                          <Link
                            key={`${section}-${index}`}
                            to={item.path}
                            onClick={handleClose}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors text-lg"
                          >
                            <span className="text-gray-300 text-xl">
                              {item.icon}
                            </span>
                            <span className="text-gray-100">{item.text}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BurgerMenu;
