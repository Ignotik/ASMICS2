import React from "react";
import "./place.css";
import { GiTrophyCup } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const PlaceInTable: React.FC = () => {
  return (
    <section className="place bg-[#10b981] cursor-pointer mt-2 p-4 rounded-xl">
      <article className="p-2 bg-[#248666] rounded-xl place-inner flex items-center justify-between">
        <Link className="flex  items-center gap-2" to="/rating">
          <GiTrophyCup color="white" size={30} />
          <div className="flex gap-2 flex-col">
            <p>#5543545</p>
            <p>Место в турнире</p>
          </div>
        </Link>
        <div>
          <IoIosArrowForward color="white" size={30} />
        </div>
      </article>
    </section>
  );
};

export default PlaceInTable;
