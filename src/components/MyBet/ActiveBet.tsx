import React from "react";
import v from "../../assets/vitality.png";
import m from "../../assets/mouz.png";

interface Bet {
  team1: string;
  team2: string;
  odd: number;
  time: string;
  bet: string;
  price: number;
  price_win?: number;
  logo1: string;
  logo2: string;
  lose?: boolean;
  active?: boolean;
  type: string;
}

const data: Bet[] = [
  {
    team1: "Vitality",
    type: "Ординар",
    team2: "Mouz",
    odd: 1.5,
    bet: "Исход[карта 2] - Mouz",
    time: "20.02.2025 - 19:39",
    price: 100,
    price_win: 100,
    logo1: v,
    logo2: m,
    active: true,
  },
];

data.forEach((item) => {
  item.price_win = item.price * item.odd;
});

const ActiveBet: React.FC = () => {
  if (data.length === 0) {
    return (
      <div>
        <p>Нет активных ставок</p>
      </div>
    );
  }

  return (
    <section>
      {data.map((bet, index) => (
        <div
          key={index}
          className="flex flex-col bg-[#0ea5e9] rounded-xl justify-between items-center p-4"
        >
          <article className="flex items-center pb-4  border-b-2 justify-between w-full">
            <div>
              <p className="text-2xl font-bold">
                {bet.team1} - {bet.team2}
              </p>
              <p>{bet.time}</p>
            </div>
            <div className="flex gap-2">
              <img className="w-10 h-10" src={bet.logo1} alt={bet.team1} />
              <img className="w-10 h-10" src={bet.logo2} alt={bet.team2} />
            </div>
          </article>
          <article className="mt-4 flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
              <img className="w-10 h-10" src={bet.logo1} alt={bet.team1} />
              <div>
                <p className="text-2xl font-bold">{bet.team1}</p>
                <p className="text-[12px] font-bold">{bet.bet}</p>
              </div>
            </div>
            <div>
              <p
                className={
                  bet.active
                    ? "text-2xl font-bold text-white"
                    : "text-2xl font-bold"
                }
              >
                {bet.odd}
              </p>
            </div>
          </article>
          <article className="w-full mt-4 flex justify-between items-center">
            <p className="text-2xl text-gray-600 font-bold">
              {bet.price} - {bet.price_win}
            </p>
            <p>
              <span className="text-2xl font-bold text-gray-600">
                {bet.odd}
              </span>
            </p>
          </article>
          <article className="w-full mt-4 flex justify-between items-center">
            <div>
              <p className="text-[14px] font-bold">{bet.type}</p>
              <p className="text-[14px] font-bold">{bet.time}</p>
            </div>
            <p className="p-4 bg-[#248666] rounded-xl">
              {bet.active ? "Матч идет" : "Завершена"}
            </p>
          </article>
        </div>
      ))}
    </section>
  );
};

export default ActiveBet;
