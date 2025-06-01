// MenuBet.tsx
import React from "react";

type MenuBetProps = {
  activeTab: "active" | "completed";
  setActiveTab: (tab: "active" | "completed") => void;
};

const MenuBet: React.FC<MenuBetProps> = ({ activeTab, setActiveTab }) => {
  return (
    <section>
      <h2 className="font-bold text-2xl pb-4 text-left">История ставок</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("active")}
          className={`text-[18px] font-bold ${
            activeTab === "active"
              ? "border-b-2 border-[#10b981]"
              : "opacity-70"
          }`}
        >
          Активные ставки
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`text-[18px] font-bold ${
            activeTab === "completed"
              ? "border-b-2 border-[#10b981]"
              : "opacity-70"
          }`}
        >
          Завершенные ставки
        </button>
      </div>
    </section>
  );
};

export default MenuBet;
