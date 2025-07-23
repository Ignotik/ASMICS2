type AdminPanelProps = {
  activeTab:
    | "Карточки"
    | "Турниры"
    | "Пользователи"
    | "Коллекции карточек"
    | "Команды"
    | "Матчи";
  setActiveTab: (
    tab:
      | "Карточки"
      | "Турниры"
      | "Пользователи"
      | "Коллекции карточек"
      | "Команды"
      | "Матчи"
  ) => void;
};

const AdminPanelMenu: React.FC<AdminPanelProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <section>
      <h2 className="font-bold text-2xl pb-4 text-left">Админ-панель</h2>
      <div className="relative">
        <div className="flex overflow-x-auto pb-2 mb-2 scrollbar-hide whitespace-nowrap">
          <button
            onClick={() => setActiveTab("Коллекции карточек")}
            className={`text-[13px] font-bold px-4 py-2 mr-2 ${
              activeTab === "Коллекции карточек"
                ? "border-b-2 border-[#10b981]"
                : "opacity-70"
            }`}
          >
            Коллекции карточек
          </button>
          <button
            onClick={() => setActiveTab("Карточки")}
            className={`text-[12px] font-bold px-4 py-2 mr-2 ${
              activeTab === "Карточки"
                ? "border-b-2 border-[#10b981]"
                : "opacity-70"
            }`}
          >
            Карточки
          </button>
          <button
            onClick={() => setActiveTab("Турниры")}
            className={`text-[12px] font-bold px-4 py-2 mr-2 ${
              activeTab === "Турниры"
                ? "border-b-2 border-[#10b981]"
                : "opacity-70"
            }`}
          >
            Турниры
          </button>
          <button
            onClick={() => setActiveTab("Матчи")}
            className={`text-[12px] font-bold px-4 py-2 mr-2 ${
              activeTab === "Матчи"
                ? "border-b-2 border-[#10b981]"
                : "opacity-70"
            }`}
          >
            Матчи
          </button>
          <button
            onClick={() => setActiveTab("Команды")}
            className={`text-[13px] font-bold px-4 py-2 mr-2 ${
              activeTab === "Команды"
                ? "border-b-2 border-[#10b981]"
                : "opacity-70"
            }`}
          >
            Команды
          </button>
          <button
            onClick={() => setActiveTab("Пользователи")}
            className={`text-[12px] font-bold px-4 py-2 ${
              activeTab === "Пользователи"
                ? "border-b-2 border-[#10b981]"
                : "opacity-70"
            }`}
          >
            Пользователи
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminPanelMenu;
