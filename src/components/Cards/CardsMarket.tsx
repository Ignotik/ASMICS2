import React from "react";
import CardPack from "./CardPack";
import Nightmare from "../../assets/Nightmare.png";

const CardPackItems = [
  {
    id: 1,
    img: Nightmare,
    name: "Набор 2019",
    price: 129,
    description: "",
    players: [
      {
        id: 1,
        name: "S1mple",
        img: "",
      },
      {
        id: 2,
        name: "Karrigan",
        img: "",
      },
      {
        id: 3,
        name: "Niko",
        img: "",
      },
    ],
  },
  {
    id: 2,
    img: Nightmare,
    name: "Набор 2019",
    price: 129,
    description: "",
    players: [],
  },
  {
    id: 3,
    img: Nightmare,
    name: "Набор 2019",
    price: 129,
    description: "",
    players: [],
  },
];

const CardsMarket: React.FC = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {CardPackItems.map((item) => (
          <CardPack key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default CardsMarket;
