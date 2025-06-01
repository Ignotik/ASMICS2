import React from "react";
import a from "../../assets/Nightmare.png";

interface Rating {
  id: number;
  name: string;
  prize: number;
  img: string;
  score: number;
}

const data: Rating[] = [
  {
    id: 1,
    name: "S1mple",
    prize: 5000,
    img: a,
    score: 2000,
  },
  {
    id: 2,
    name: "Karrigan",
    prize: 3200,
    img: a,
    score: 100,
  },
  {
    id: 3,
    name: "Niko",
    prize: 4200,
    img: a,
    score: 120,
  },
];

const Rating: React.FC = () => {
  const sortedData = [...data].sort((a, b) => b.score - a.score); // Сортировка по убыванию

  return (
    <section className="max-w-md mx-auto">
      <h2 className="font-bold text-2xl pb-6 text-center text-[#0ea5e9]">
        Рейтинг игроков
      </h2>

      <div className="space-y-4">
        {sortedData.map((item, index) => (
          <div
            key={item.id}
            className={`bg-[#0a6e9c] rounded-xl p-4 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] ${
              index === 0 ? "border-2 border-yellow-400" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-white">
                #{index + 1}
              </span>
              {index === 0 && (
                <span className="bg-yellow-400 text-[#0a6e9c] px-2 py-1 rounded-md text-sm font-bold">
                  ЛИДЕР
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                className="w-32 h-32 object-cover"
                src={item.img}
                alt={item.name}
              />

              <div className="text-center md:text-left space-y-2">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>

                <div className="flex items-center">
                  <span className="text-gray-200 pr-1">Счет: </span>
                  <span className="font-mono font-bold text-white">
                    {item.score}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-200 pr-1">Приз: </span>
                  <span className="font-mono font-bold text-green-300">
                    ${item.prize}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rating;
