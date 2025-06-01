import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import DoBetMain from "./DoBetMain";

interface DoBetProps {
  selectedMatch: {
    team1: string;
    team2: string;
    time: string;
    logo1: string | null;
    logo2: string | null;
  } | null;
  selectedOdd: {
    team: string;
    value: number;
  } | null;
  betAmount: number;
  setSelectedMatch: (match: null) => void;
  setSelectedOdd: (odd: null) => void;
  setBetAmount: (amount: number) => void;
  placeBet: () => void;
}

const DoBet: React.FC<DoBetProps> = ({
  selectedMatch,
  selectedOdd,
  betAmount,
  setSelectedMatch,
  setSelectedOdd,
  setBetAmount,
  placeBet,
}) => {
  if (!selectedMatch || !selectedOdd) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50"
        onClick={() => {
          setSelectedMatch(null);
          setSelectedOdd(null);
        }}
      >
        {/* Основное модальное окно */}
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className="bg-[#0a6e9c] rounded-xl p-6 w-[95%] max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <DoBetMain
            selectedMatch={selectedMatch}
            selectedOdd={selectedOdd}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
          />

          <div className="flex gap-3">
            <button
              onClick={() => {
                setSelectedMatch(null);
                setSelectedOdd(null);
              }}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition-colors"
            >
              Отмена
            </button>
            <button
              disabled={!betAmount}
              onClick={placeBet}
              className={`${
                !betAmount && "opacity-50 cursor-not-allowed"
              } flex-1 bg-[#10b981] hover:bg-[#0d9e6e] text-white py-2 rounded transition-colors`}
            >
              Подтвердить
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DoBet;
