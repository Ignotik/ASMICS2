import React from "react";

const data = [];

const FinishedBet: React.FC = () => {
  if (data.length === 0) {
    return (
      <div className="bg-[#0ea5e9] rounded-xl p-15 text-center">
        <p className="text-2xl font-bold">У вас пока нет завершенных ставок</p>
      </div>
    );
  }

  return <div>FinishedBet</div>;
};

export default FinishedBet;
