import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { baseUrl } from "../../utils/consts/url-backend";
import ChangeTeamModal from "../Modal/ChangeTeamModal";
import { useTeamStore } from "../../utils/store/TeamStore";

interface FormData {
  name: string;
  icon_path: File | null;
}

const TeamPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [isModalOpen, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    icon_path: new File([], ""),
  });
  const [preview, setPreview] = useState<string | null>(null);
  const {
    fetchTeams,
    updateTeam,
    deleteTeam,
    createTeam,
    teams,
    isLoading,
    error,
  } = useTeamStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, icon_path: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = (teamId: number) => {
    setSelectedTeamId(teamId);
    setOpenModal(true);
  };
  const handleChangeSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    if (!formData.icon_path) {
      alert("Пожалуйста, выберите изображение");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("icon", formData.icon_path);

    try {
      updateTeam(id, formDataToSend);
      setFormData({
        name: "",
        icon_path: null,
      });
      setPreview(null);
      alert("Команда успешно изменина!");
    } catch (error) {
      alert("Ошибка при создании команды: " + error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.icon_path) {
      alert("Пожалуйста, выберите изображение");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("icon", formData.icon_path);

    try {
      createTeam(formDataToSend);
      setFormData({
        name: "",
        icon_path: null,
      });
      setPreview(null);
      alert("Команда успешно создана!");
    } catch (error) {
      alert("Ошибка при создании команды: " + error);
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="p-4 space-y-4">
        <article className="flex gap-2 items-center">
          <input
            className="bg-[#0ea5e9] p-2 w-full rounded-xl focus:outline-none text-white placeholder-white/80"
            type="text"
            placeholder="Поиск команд..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchTeams}
            disabled={isLoading}
            className="bg-[#10b981] text-[12px] py-1 px-4 rounded-[5px] hover:bg-[#059669] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Загрузка..." : "Получить команды"}
          </button>
        </article>

        {error && (
          <div className="p-2 bg-red-500/20 text-red-500 rounded-xl">
            {error}
          </div>
        )}

        <article className="space-y-2">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="p-3 rounded-xl flex justify-between items-center bg-[#075985]"
            >
              <div className="flex gap-4 items-center">
                {team.icon_path && (
                  <img
                    src={baseUrl + "/" + team.icon_path}
                    alt={team.name}
                    className="w-12 h-12  object-inherit"
                  />
                )}
                <div>
                  <p className="font-bold">{team.name}</p>
                  <p className="text-sm opacity-80">ID: {team.id}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(team.id)}
                  className="p-1 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                >
                  Изменить
                </button>
                <button
                  onClick={() => deleteTeam(team.id)}
                  className="p-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </article>
        <article className="p-4 bg-[#075985]/50 rounded-xl">
          <h3 className="font-bold mb-2">Добавить новую команду</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Название команды
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#0ea5e9] focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Изображение</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-gray-100 p-2 rounded flex items-center gap-2">
                  <FaUpload />
                  <span>Выберите файл</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
                {preview && (
                  <div className="w-20 h-20 border rounded overflow-hidden">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#10b981] p-2 rounded hover:bg-[#059669] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Создание..." : "Добавить команду"}
            </button>
          </form>
        </article>
      </section>
      {isModalOpen && (
        <ChangeTeamModal
          handleChangeSubmit={handleChangeSubmit}
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          preview={preview}
          isLoading={isLoading}
          teamId={selectedTeamId}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default TeamPanel;
