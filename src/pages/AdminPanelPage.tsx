import React, { useState } from "react";
import AdminPanelMenu from "../components/AdminPanel/AdminPanelMenu";
import UserPanel from "../components/AdminPanel/UserPanel";
import CardPanel from "../components/AdminPanel/CardPanel";
import CardPackPanel from "../components/AdminPanel/CardPackPanel";
import TeamPanel from "../components/AdminPanel/TeamPanel";
import TournamentPanel from "../components/AdminPanel/TournamentPanel";
import MatchPanel from "../components/AdminPanel/MatchPanel";

const AdminPanelPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | "Турниры"
    | "Пользователи"
    | "Карточки"
    | "Коллекции карточек"
    | "Команды"
    | "Матчи"
  >("Матчи");
  return (
    <section className="pt-16">
      <AdminPanelMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Пользователи" && <UserPanel />}
      {activeTab === "Карточки" && <CardPanel />}
      {activeTab === "Коллекции карточек" && <CardPackPanel />}
      {activeTab === "Команды" && <TeamPanel />}
      {activeTab === "Турниры" && <TournamentPanel />}
      {activeTab === "Матчи" && <MatchPanel />}
    </section>
  );
};

export default AdminPanelPage;
