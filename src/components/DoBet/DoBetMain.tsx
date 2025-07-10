import React from "react";
import type { Team } from "../Tourners/Tourner";

type DoBetProps = {
  selectedMatch: {
    team_1: Team;
    team_2: Team;
  };
  selectedOdd: {
    team: string;
    value: number;
  };
  betAmount: number;
  setBetAmount: (amount: number) => void;
};

const quickSum = [100, 500, 1000, 5000, 10000];

const DoBetMain: React.FC<DoBetProps> = ({
  selectedMatch,
  selectedOdd,
  betAmount,
  setBetAmount,
}) => {
  const handleQuickSumClick = (sum: number) => {
    setBetAmount(sum);
  };

  const handleClearClick = () => {
    setBetAmount(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBetAmount(value === "" ? 0 : Number(value));
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-4 border-b-2 pb-4">Сделать ставку</h3>
      <div className="mb-6 flex justify-between items-center px-4">
        {/* Команда 1 */}
        <div className="flex flex-col items-center w-1/3">
          <div className="w-16 h-16 mb-2 flex items-center justify-center">
            {selectedMatch.team_1.icon_path ? (
              <img
                className="max-h-full max-w-full object-contain"
                src={selectedMatch.team_1.icon_path}
                alt={selectedMatch.team_1.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/64";
                }}
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs text-center">
                  {selectedMatch.team_1.name}
                </span>
              </div>
            )}
          </div>
          <p className="font-medium text-center text-sm md:text-base">
            {selectedMatch.team_1.name}
          </p>
        </div>

        {/* Время матча */}
        {/* <div className="flex flex-col items-center mx-2 w-1/3">
          <div className="text-xs text-gray-300 mb-1">Матч</div>
          <div className="bg-[#0ea5e9] text-white text-xs px-2 py-1 rounded-md">
            {selectedMatch.time}
          </div>
        </div> */}

        {/* Команда 2 */}
        <div className="flex flex-col items-center w-1/3">
          <div className="w-16 h-16 mb-2 flex items-center justify-center">
            {selectedMatch.team_2.icon_path ? (
              <img
                className="max-h-full max-w-full object-contain"
                src={selectedMatch.team_2.icon_path}
                alt={selectedMatch.team_2.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/64";
                }}
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs text-center">
                  {selectedMatch.team_2.name}
                </span>
              </div>
            )}
          </div>
          <p className="font-medium text-center text-sm md:text-base">
            {selectedMatch.team_2.name}
          </p>
        </div>
      </div>

      <div className="bg-[#0ea5e9] bg-opacity-20 p-3 rounded-lg mb-4">
        <p className="font-bold">Вы выбрали: {selectedOdd.team}</p>
        <p className="font-bold">Коэффициент: {selectedOdd.value.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Сумма ставки:</label>
        <div className="relative">
          <input
            type="number"
            placeholder="Введите сумму ставки"
            value={betAmount || ""}
            onChange={handleInputChange}
            className="w-full p-2 pr-8 rounded bg-[#0a6e9c] border border-[#0ea5e9]"
            min="10"
            step="10"
          />
          {betAmount > 0 && (
            <button
              onClick={handleClearClick}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
            >
              ×
            </button>
          )}
        </div>
        <p className="my-2 text-sm">Выберите сумму ставки из списка: </p>
        <div className="mt-2 text-sm flex flex-wrap gap-2">
          {quickSum.map((sum) => (
            <button
              key={sum}
              onClick={() => handleQuickSumClick(sum)}
              className="bg-[#10b981] hover:bg-[#0d9f6e] p-2 rounded transition-colors"
            >
              {sum}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0ea5e9] bg-opacity-20 p-3 rounded-lg mb-4">
        <p>
          Возможный выигрыш:{" "}
          <span className="font-bold">
            {(betAmount * selectedOdd.value).toFixed(2)}
          </span>
        </p>
      </div>
    </>
  );
};

export default DoBetMain;
