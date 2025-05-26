import React, { useState } from "react";
import { HiOutlineGift } from "react-icons/hi";
import "./layout.css";
import { FaRegBell } from "react-icons/fa";
import { CiBitcoin } from "react-icons/ci";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="p-2 fixed top-0 z-10 m-2.5 left-0 right-0 header rounded-xl">
        <section className="flex justify-between items-center">
          <article
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-2 cursor-pointer"
          >
            <span className="h-[2px] w-8 bg-white"></span>
            <span className="h-[2px] w-8 bg-white"></span>
            <span className="h-[2px] w-8 bg-white"></span>
          </article>
          <article className="flex items-center gap-4">
            <HiOutlineGift color="#f39404" size={30} />
            <FaRegBell color="#f39404" size={30} />
            <div className="flex items-center gap-1">
              0
              <CiBitcoin color="#f39404" size={40} />
            </div>
          </article>
        </section>
      </header>
      {isOpen && <BurgerMenu setIsOpen={setIsOpen} />}
    </>
  );
};

export default Header;
