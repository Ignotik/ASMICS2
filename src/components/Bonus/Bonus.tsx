// components/BonusComponent.tsx
import React from "react";
import { useBonusStore } from "../../utils/store/BonusStore";
import { useUserStore } from "../../utils/store/UserStore";

const BonusComponent: React.FC = () => {
  const { user } = useUserStore();
  const {
    bonusDays,
    lastCollectionDate,
    welcomeBonusClaimed,
    currentStreak,
    isLoading,
    error,
    claimDailyBonus,
  } = useBonusStore();

  const handleDailyBonus = async () => {
    try {
      if (user) {
        await claimDailyBonus(user.id);
        alert(
          `You've claimed your daily bonus! Current streak: ${
            currentStreak + 1
          }`
        );
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to claim bonus");
    }
  };

  const canClaimDailyBonus = () => {
    if (!lastCollectionDate) return true;
    const lastDate = new Date(lastCollectionDate);
    const today = new Date();
    return (
      today.getDate() !== lastDate.getDate() ||
      today.getMonth() !== lastDate.getMonth() ||
      today.getFullYear() !== lastDate.getFullYear()
    );
  };

  const currentDayIndex = currentStreak % 7;

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">Бонусы</h2>

      {error && <div className="text-red-500">{error}</div>}

      <article className="bg-[#0ea5e9] rounded-xl p-4 flex flex-col">
        <h2 className="font-bold text-black mb-4">Ежедневный бонус</h2>
        <div className="flex items-center justify-between gap-2">
          {bonusDays.map((item, index) => (
            <div
              key={item.day}
              className={`w-12 h-12 rounded-[5px] flex flex-col items-center justify-center text-white
                ${
                  item.collected
                    ? "bg-green-500"
                    : index === currentDayIndex && canClaimDailyBonus()
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
            >
              <span className="text-sm">{item.day}</span>
              <span className="text-xs">5000</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleDailyBonus}
          disabled={!canClaimDailyBonus() || isLoading}
          className={`mt-4 rounded py-2 px-4 font-bold
            ${
              canClaimDailyBonus()
                ? "bg-[#f97316] hover:bg-orange-600 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {isLoading
            ? "Loading..."
            : canClaimDailyBonus()
            ? `Claim ${bonusDays[currentDayIndex]?.reward} coins`
            : "Already claimed"}
        </button>
        <div className="mt-2 text-sm">Current streak: {currentStreak} days</div>
      </article>

      <article className="bg-[#0ea5e9] rounded-xl p-4 flex flex-col">
        <h2 className="font-bold text-black">Приветственный бонус</h2>
        <p className="mb-2">
          Получите 10,000 монет в качестве приветственного бонуса! Доступен
          только один раз.
        </p>
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
            {welcomeBonusClaimed ? "Claimed" : "Not claimed"}
          </p>
        </div>
        <div className="flex p-2 bg-[#075985] justify-between items-center rounded-xl">
          <div className="flex flex-col">
            <p className="text-black text-[15px]">Ежедневный бонус</p>
            <p className="text-black text-[12px]">
              Current streak: {currentStreak} days
            </p>
          </div>
          <p className="text-black text-[15px]">
            {canClaimDailyBonus() ? "Available" : "Claimed today"}
          </p>
        </div>
      </article>
    </section>
  );
};

export default BonusComponent;
