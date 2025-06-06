import React, { useState, useEffect } from "react";

interface BonusDay {
  day: number;
  taken: boolean;
  collected: boolean;
  reward: number;
}

const initialData: BonusDay[] = [
  { day: 1, taken: false, collected: false, reward: 10 },
  { day: 2, taken: false, collected: false, reward: 20 },
  { day: 3, taken: false, collected: false, reward: 30 },
  { day: 4, taken: false, collected: false, reward: 40 },
  { day: 5, taken: false, collected: false, reward: 50 },
  { day: 6, taken: false, collected: false, reward: 60 },
  { day: 7, taken: false, collected: false, reward: 100 },
];

const BonusComponent: React.FC = () => {
  const [bonusDays, setBonusDays] = useState<BonusDay[]>(() => {
    const saved = localStorage.getItem("dailyBonus");
    return saved ? JSON.parse(saved) : initialData;
  });
  const [lastCollectionDate, setLastCollectionDate] = useState<string | null>(
    localStorage.getItem("lastCollectionDate")
  );
  const [currentDay, setCurrentDay] = useState<number>(0);
  const reg = true;

  // Объявляем today в начале компонента
  const today = new Date().toDateString();

  useEffect(() => {
    if (lastCollectionDate !== today) {
      const nextDay = lastCollectionDate ? (currentDay % 7) + 1 : 1;

      setCurrentDay(nextDay);

      setBonusDays((prev) =>
        prev.map((day) =>
          day.day === nextDay ? { ...day, taken: true, collected: false } : day
        )
      );
    }
  }, [lastCollectionDate, currentDay, today]);

  useEffect(() => {
    localStorage.setItem("dailyBonus", JSON.stringify(bonusDays));
  }, [bonusDays]);

  const collectBonus = () => {
    const reward = bonusDays.find((day) => day.day === currentDay)?.reward || 0;

    setBonusDays((prev) =>
      prev.map((day) =>
        day.day === currentDay ? { ...day, collected: true } : day
      )
    );

    setLastCollectionDate(today);
    localStorage.setItem("lastCollectionDate", today);

    alert(`Вы получили ${reward} бонусов!`);
  };

  const canCollectToday = () => {
    return (
      lastCollectionDate !== today &&
      bonusDays.some(
        (day) => day.day === currentDay && day.taken && !day.collected
      )
    );
  };

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">Бонусы</h2>
      <article className="bg-[#0ea5e9] rounded-xl p-4 flex flex-col">
        <h2 className="font-bold text-black mb-4">Ежедневный бонус</h2>
        <div className="flex items-center justify-between gap-2">
          {bonusDays.map((item) => (
            <div
              key={item.day}
              className={`w-12 h-12 rounded-[5px] flex flex-col items-center justify-center text-white
                ${
                  item.collected
                    ? "bg-green-500"
                    : item.taken
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
            >
              <span className="text-sm">{item.day}</span>
            </div>
          ))}
        </div>
        <button
          onClick={collectBonus}
          disabled={!canCollectToday()}
          className={`mt-4 rounded py-2 px-4 font-bold
            ${
              canCollectToday()
                ? "bg-[#f97316] hover:bg-orange-600 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {canCollectToday()
            ? `Забрать ${
                bonusDays.find((day) => day.day === currentDay)?.reward
              } монет`
            : "Уже получено"}
        </button>
      </article>
      <article className="bg-[#0ea5e9] rounded-xl p-4 flex flex-col">
        <h2 className="font-bold text-black">Приветственный бонус</h2>
        <p>
          Получите 10,000 монет в качестве приветственного бонуса! Доступен
          только один раз.
        </p>
        <button></button>
      </article>
      <article className="bg-[#0ea5e9] rounded-xl p-4 gap-2 flex flex-col">
        <h2 className="font-bold text-black">Активные бонусы</h2>
        <div className="flex p-2 bg-[#075985] justify-between items-center rounded-xl">
          <div className="flex flex-col">
            <p className="text-black text-[15px]">Приветственный бонус</p>
            <p className="text-black text-[12px]">
              +10000 монет при регистрации
            </p>
          </div>
          <p className="text-black text-[15px]">
            {reg ? "Активирован" : "Не активирован"}
          </p>
        </div>
        <div className="flex p-2 bg-[#075985] justify-between items-center rounded-xl">
          <div className="flex flex-col">
            <p className="text-black text-[15px]">Ежедневный бонус</p>
            <p className="text-black text-[12px]">+5000 каждый день</p>
          </div>
          <p className="text-black text-[15px]">
            {lastCollectionDate === today ? "Активирован" : "Не активирован"}
          </p>
        </div>
      </article>
    </section>
  );
};

export default BonusComponent;
