import React from "react";
import { useNavigate } from "react-router-dom";

interface CardPackProps {
  id: number;
  img: string;
  name: string;
  price: number;
  description: string;
}

const CardPack: React.FC<CardPackProps> = ({
  id,
  name,
  img,
  price,
  description,
}) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/open-pack/${id}`); // Передаем ID кейса в URL
  };
  return (
    <section className="card border-1 gap-4 flex flex-col w-[177px] rounded-xl p-4">
      <h1 className="text-lg font-bold">{name}</h1>
      <article className="flex gap-2 flex-col">
        <img src={img} alt={name} className="w-full h-auto rounded-lg" />
        <p className="text-sm">{description}</p>

        <div className="flex justify-between items-center">
          <p className="card-text">
            {price} <br /> ASMI
          </p>
          <button
            className="card-btn p-2 rounded-xl hover:bg-purple-700 transition-colors"
            onClick={handleBuyClick}
          >
            Купить
          </button>
        </div>
      </article>
    </section>
  );
};

export default CardPack;
