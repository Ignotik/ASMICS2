import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { baseUrl } from "../../utils/consts/url-backend";
import { useTournamentStore } from "../../utils/store/TournamentStore";
import type { Match } from "../../utils/types/tournament";

interface FormData {
  name: string;
  icon_path: File | null;
  Matches: Match[];
}

const TournamentPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    icon_path: new File([], ""),
    Matches: [],
  });
  const [preview, setPreview] = useState<string | null>(null);
  const {
    tournaments,
    deleteTournament,
    createTournament,
    fetchTournaments,
    isLoading,
    error,
  } = useTournamentStore();

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
      createTournament(formDataToSend);
      setFormData({
        name: "",
        icon_path: null,
        Matches: [],
      });
      setPreview(null);
      alert("Турнир успешно создан!");
    } catch (error) {
      alert("Ошибка при создании турнира: " + error);
    }
  };

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="p-4 space-y-4">
        <article className="flex gap-2 items-center">
          <input
            className="bg-[#0ea5e9] p-2 w-full rounded-xl focus:outline-none text-white placeholder-white/80"
            type="text"
            placeholder="Поиск турниров..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchTournaments}
            disabled={isLoading}
            className="bg-[#10b981] text-[12px] py-1 px-4 rounded-[5px] hover:bg-[#059669] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Загрузка..." : "Получить турниры"}
          </button>
        </article>
        {filteredTournaments.length === 0 && (
          <div className="p-2 bg-red-500/20 text-red-500 rounded-xl">
            Турниров не найдено
          </div>
        )}

        {error && (
          <div className="p-2 bg-red-500/20 text-red-500 rounded-xl">
            {error}
          </div>
        )}

        <article className="space-y-2">
          {filteredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="p-3 rounded-xl flex justify-between items-center bg-[#075985]"
            >
              <div className="flex gap-4 items-center">
                {tournament.icon_path && (
                  <img
                    src={baseUrl + "/" + tournament.icon_path}
                    alt={tournament.name}
                    className="w-12 h-12  object-inherit"
                  />
                )}
                <div>
                  <p className="font-bold">{tournament.name}</p>
                  <p className="text-sm opacity-80">ID: {tournament.id}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => deleteTournament(tournament.id)}
                  className="p-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </article>
        <article className="p-4 bg-[#075985]/50 rounded-xl">
          <h3 className="font-bold mb-2">Добавить новый турнир</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Название турнира
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
              {isLoading ? "Создание..." : "Добавить турнир"}
            </button>
          </form>
        </article>
      </section>
    </>
  );
};

export default TournamentPanel;
