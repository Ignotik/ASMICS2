import React from "react";
import "./place.css";
import { GiTrophyCup } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";

const PlaceInTable: React.FC = () => {
  return (
    <section className="place mt-2 p-4 rounded-xl">
      <article className="p-2 rounded-xl place-inner flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GiTrophyCup color="white" size={30} />
          <div className="flex gap-2 flex-col">
            <p>#5543545</p>
            <p>Место в турнире</p>
          </div>
        </div>
        <div>
          <IoIosArrowForward color="white" size={30} />
        </div>
      </article>
    </section>
  );
};

export default PlaceInTable;
