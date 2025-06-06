import React from "react";
import type { Card } from "../../utils/store/CardStore";
import { baseUrl } from "../../utils/consts/url-backend";

export const CardItem = React.memo(({ card }: { card: Card }) => (
  <div className="flex-shrink-0 text-center w-[140px] h-[250px] mx-2 bg-gray-700 rounded-lg flex flex-col items-center justify-center">
    <div className="flex justify-center overflow-hidden">
      <img
        src={`${baseUrl}${card.image}`}
        alt={card.name}
        className="w-[140px] rounded-t-xl"
        loading="lazy"
        decoding="async"
      />
    </div>
    <p className="text-[12px] font-bold mx-2 mt-2">{card.name}</p>
  </div>
));
