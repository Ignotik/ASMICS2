import axios from "axios";
import React from "react";
import { baseUrl } from "../../utils/consts/url-backend";
import type { CardCollection } from "../../utils/types/cards";

export interface Card {
  id: number;
  name: string;
  valuable: number;
  collection: CardCollection;
  icon_path: string;
}

const CardPanel: React.FC = () => {
  const CreateCard = () => {
    const responce = axios.post(`${baseUrl}/cards`, {});
    console.log(responce);
  };

  const [search, setSearch] = React.useState("");
  return (
    <section>
      <article className="flex gap-2">
        <h2>Создание карточки</h2>
        <div>
          <div>
            <input
              className="bg-[#0ea5e9] p-2 w-full rounded-xl focus:outline-none"
              type="text"
              placeholder="Создать карточку"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input type="file" />
          </div>
          <button
            onClick={() => CreateCard()}
            className="bg-[#10b981] p-2 px-4 rounded-[5px] hover:bg-[#059669] transition-colors"
          >
            Найти
          </button>
        </div>
      </article>
      <article>
        <input type="text" />
      </article>
      <article>
        <input type="text" />
      </article>
      <article>
        <input type="text" />
      </article>
      <article>
        <input type="text" />
      </article>
    </section>
  );
};

export default CardPanel;
