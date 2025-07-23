import { useState, useEffect } from "react";
import type { MatchFormData } from "../../utils/types/tournament";
import { useTeamStore } from "../../utils/store/TeamStore";
import { useMatchStore } from "../../utils/store/MatchStore";
import { useTournamentStore } from "../../utils/store/TournamentStore";

const MatchPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [newMatch, setNewMatch] = useState<MatchFormData>({
    team_1: null,
    team_2: null,
    team_1_coefficient: 1,
    team_2_coefficient: 1,
    started_at: "",
    tournament: null,
  });

  const { matches, deleteMatch, createMatch, fetchMatches, isLoading, error } =
    useMatchStore();
  const { teams, fetchTeams } = useTeamStore();
  const { tournaments, fetchTournaments } = useTournamentStore(); // Получаем турниры

  useEffect(() => {
    fetchTeams();
    fetchTournaments();
  }, []);
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!newMatch.team_1) errors.team_1 = "Команда 1 обязательна";
    if (!newMatch.started_at) errors.started_at = "Укажите время матча";
    if (!newMatch.team_2) errors.team_2 = "Команда 2 обязательна";

    if (
      newMatch.team_1 &&
      newMatch.team_2 &&
      newMatch.team_1 === newMatch.team_2
    ) {
      errors.team_2 = "Команды должны быть разными";
    }

    const team1Coeff = Number(newMatch.team_1_coefficient);
    const team2Coeff = Number(newMatch.team_2_coefficient);

    if (isNaN(team1Coeff)) errors.team_1_coefficient = "Введите число";
    else if (team1Coeff < 1) errors.team_1_coefficient = "Должен быть ≥ 1";

    if (isNaN(team2Coeff)) errors.team_2_coefficient = "Введите число";
    else if (team2Coeff < 1) errors.team_2_coefficient = "Должен быть ≥ 1";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTeamChange = (
    teamField: "team_1" | "team_2",
    value: number | null
  ) => {
    setNewMatch((prev) => ({
      ...prev,
      [teamField]: value,
    }));
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMatch((prev) => ({
      ...prev,
      started_at: e.target.value,
    }));
  };

  const handleTournamentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewMatch((prev) => ({
      ...prev,
      tournament: e.target.value ? parseInt(e.target.value) : null,
    }));
  };
  const handleCoefficientChange = (
    team: "team_1" | "team_2",
    value: string
  ) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setNewMatch((prev) => ({
        ...prev,
        [`${team}_coefficient`]: value === "" ? "" : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      createMatch({
        team_1: newMatch.team_1!,
        team_2: newMatch.team_2!,
        team_1_coefficient: Number(newMatch.team_1_coefficient),
        team_2_coefficient: Number(newMatch.team_2_coefficient),
        started_at: newMatch.started_at,
        tournament: newMatch.tournament,
      });
      setNewMatch({
        team_1: null,
        team_2: null,
        team_1_coefficient: 1,
        team_2_coefficient: 1,
        started_at: "",
        tournament: null,
      });
    } catch (error) {
      console.error("Ошибка создания матча:", error);
    }
  };

  return (
    <section className="p-4 space-y-4">
      <article className="flex gap-2 items-center">
        <input
          className="bg-[#0ea5e9] p-2 w-full rounded-xl focus:outline-none text-white placeholder-white/80"
          type="text"
          placeholder="Поиск матчей..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={fetchMatches}
          disabled={isLoading}
          className="bg-[#10b981] text-[12px] py-1 px-4 rounded-[5px] hover:bg-[#059669] transition-colors disabled:opacity-50"
        >
          {isLoading ? "Загрузка..." : "Получить матчи"}
        </button>
      </article>

      {error && (
        <div className="p-2 bg-red-500/20 text-red-500 rounded-xl">{error}</div>
      )}

      <article className="space-y-2">
        {matches.length === 0 ? (
          <div className="p-2 bg-red-500/20 text-red-500 rounded-xl">
            Матчей не найдено
          </div>
        ) : (
          matches.map((match) => (
            <div
              key={match.id}
              className="p-3 rounded-xl flex justify-between items-center bg-[#075985]"
            >
              <div>
                <p className="text-sm">
                  {match.team_1?.name || "Команда 1"} (
                  {Number(match.team_1_coefficient).toFixed(2)}) vs{" "}
                  {match.team_2?.name || "Команда 2"} (
                  {Number(match.team_2_coefficient).toFixed(2)})
                </p>
                {match.started_at && (
                  <p className="text-xs opacity-75">
                    {new Date(match.started_at).toLocaleString()}
                  </p>
                )}
                {match.tournament && (
                  <p className="text-xs opacity-75">
                    Турнир: {match.tournament.name}
                  </p>
                )}
              </div>
              <button
                onClick={() => deleteMatch(match.id)}
                className="p-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
                disabled={isLoading}
              >
                Удалить
              </button>
            </div>
          ))
        )}
      </article>

      <article className="p-4 bg-[#075985]/50 rounded-xl">
        <h3 className="font-bold mb-2">Добавить новый матч</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-sm font-medium">Команда 1</label>
              <select
                value={newMatch.team_1 || ""}
                onChange={(e) =>
                  handleTeamChange(
                    "team_1",
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                className="w-full p-2 rounded bg-[#0ea5e9] focus:outline-none"
                required
              >
                <option value="">Выберите команду</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              {formErrors.team_1 && (
                <p className="text-red-400 text-xs">{formErrors.team_1}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium">Команда 2</label>
              <select
                value={newMatch.team_2 || ""}
                onChange={(e) =>
                  handleTeamChange(
                    "team_2",
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                className="w-full p-2 rounded bg-[#0ea5e9] focus:outline-none"
                required
              >
                <option value="">Выберите команду</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              {formErrors.team_2 && (
                <p className="text-red-400 text-xs">{formErrors.team_2}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-sm font-medium">Коэффициент 1</label>
              <input
                type="text"
                inputMode="decimal"
                name="team_1_coefficient"
                value={
                  newMatch.team_1_coefficient % 1 === 0
                    ? newMatch.team_1_coefficient.toString()
                    : newMatch.team_1_coefficient.toString()
                }
                onChange={(e) =>
                  handleCoefficientChange("team_1", e.target.value)
                }
                className="w-full p-2 rounded bg-[#0ea5e9] focus:outline-none"
                required
              />
              {formErrors.team_1_coefficient && (
                <p className="text-red-400 text-xs">
                  {formErrors.team_1_coefficient}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium">Коэффициент 2</label>
              <input
                type="text"
                inputMode="decimal"
                name="team_2_coefficient"
                value={
                  newMatch.team_2_coefficient % 1 === 0
                    ? newMatch.team_2_coefficient.toString()
                    : newMatch.team_2_coefficient.toString()
                }
                onChange={(e) =>
                  handleCoefficientChange("team_2", e.target.value)
                }
                className="w-full p-2 rounded bg-[#0ea5e9] focus:outline-none"
                required
              />
              {formErrors.team_2_coefficient && (
                <p className="text-red-400 text-xs">
                  {formErrors.team_2_coefficient}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Время матча</label>
            <input
              type="datetime-local"
              value={newMatch.started_at}
              onChange={handleDateTimeChange}
              className="w-full p-2 rounded bg-[#0ea5e9] focus:outline-none"
              required
            />
            {formErrors.started_at && (
              <p className="text-red-400 text-xs">{formErrors.started_at}</p>
            )}
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Турнир</label>
            <select
              value={newMatch.tournament || ""}
              onChange={handleTournamentChange}
              className="w-full p-2 rounded bg-[#0ea5e9] focus:outline-none"
            >
              <option value="">Без турнира</option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#10b981] p-2 rounded hover:bg-[#059669] transition-colors disabled:opacity-50 mt-4"
          >
            {isLoading ? "Создание..." : "Добавить матч"}
          </button>
        </form>
      </article>
    </section>
  );
};

export default MatchPanel;
