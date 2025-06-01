import React, { useState } from "react";
import ActiveBet from "../components/MyBet/ActiveBet";
import MenuBet from "../components/MyBet/MenuBet";
import FinishedBet from "../components/MyBet/FinishedBet";

const Stavki: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  return (
    <section>
      <MenuBet activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "active" && <ActiveBet />}
      {activeTab === "completed" && <FinishedBet />}
    </section>
  );
};

export default Stavki;
