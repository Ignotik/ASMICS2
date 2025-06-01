import React, { useState } from "react";
import { HiOutlineGift } from "react-icons/hi";
import { FaRegBell } from "react-icons/fa";
import { CiBitcoin } from "react-icons/ci";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="p-2 fixed top-0 z-50 m-2.5 left-0 right-0 bg-[#0ea5e9] bg-opacity-80 backdrop-blur-sm rounded-xl">
        <section className="flex justify-between items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-2 cursor-pointer p-2 group"
            aria-label="Toggle menu"
          >
            <span
              className={`h-[2px] w-8 bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-[2px] w-8 bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[2px] w-8 bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
          <div className="flex items-center gap-4">
            <HiOutlineGift color="#f39404" size={30} />
            <FaRegBell color="#f39404" size={30} />
            <div className="flex items-center gap-1">
              0
              <CiBitcoin color="#f39404" size={40} />
            </div>
          </div>
        </section>
      </header>
      <BurgerMenu setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default Header;
