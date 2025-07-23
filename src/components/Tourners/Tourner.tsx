import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuCrown } from "react-icons/lu";
import "./tourner.css";
import { baseUrl } from "../../utils/consts/url-backend";
import { motion, AnimatePresence } from "framer-motion";
import DoBet from "../DoBet/DoBet";
import { useMatchStore } from "../../utils/store/MatchStore";
import { useTournamentStore } from "../../utils/store/TournamentStore";
import type { Match, Tournament } from "../../utils/types/tournament";
import { useBetStore } from "../../utils/store/BetStore";
import { useUserStore } from "../../utils/store/UserStore";

const Tourner: React.FC = () => {
  const [openTournaments, setOpenTournaments] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [selectedOdd, setSelectedOdd] = useState<{
    team: number;
    teamName: string;
    value: number;
  } | null>(null);
  const { user } = useUserStore();
  const { fetchUser } = useUserStore();
  const { createBet } = useBetStore();
  const { matches, fetchMatches } = useMatchStore();
  const { tournaments, fetchTournaments } = useTournamentStore();

  const getData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchMatches(), fetchTournaments()]);
      setError(null);
    } catch (err) {
      setError("Ошибка при загрузке данных");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const groupedMatches = tournaments
    .map((tournament: Tournament) => {
      const tournamentMatches = matches
        .filter((match) => match.tournament?.id === tournament.id)
        .map((match) => ({
          ...match,
          time: new Date(match.started_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

      return {
        ...tournament,
        matches: tournamentMatches,
      };
    })
    .filter((tournament) => tournament.matches.length > 0);

  const toggleTournament = (tournamentId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTournaments((prev) =>
      prev.includes(tournamentId.toString())
        ? prev.filter((item) => item !== tournamentId.toString())
        : [...prev, tournamentId.toString()]
    );
  };

  const handleOddClick = (
    match: Match,
    team: "team_1" | "team_2",
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const selectedTeam = team === "team_1" ? match.team_1 : match.team_2;
    if (!selectedTeam) return;

    setSelectedMatch(match);
    setSelectedOdd({
      team: selectedTeam.id,
      teamName: selectedTeam.name,
      value: parseFloat(
        team === "team_1"
          ? match.team_1_coefficient.toString()
          : match.team_2_coefficient.toString()
      ),
    });
  };
  const placeBet = async () => {
    if (!selectedMatch || !selectedOdd || betAmount <= 0 || !user) {
      console.error("Invalid bet data:", {
        selectedMatch,
        selectedOdd,
        betAmount,
        user,
      });
      return;
    }

    await createBet(
      {
        userId: user.id,
        team: selectedOdd.team,
        amount: betAmount,
      },
      selectedMatch.id
    );

    await fetchUser(user.id);

    alert(
      `Ставка принята: ${selectedOdd.team} (коэф. ${selectedOdd.value}) на сумму ${betAmount}`
    );
    setSelectedMatch(null);
    setSelectedOdd(null);
  };

  if (loading) return <div className="text-center py-4">Загрузка...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;
  if (groupedMatches.length === 0)
    return <div className="text-center py-4">Нет доступных матчей</div>;

  return (
    <section className="mt-4 flex flex-col gap-4">
      <p className="font-bold text-[20px]">Турниры</p>
      {groupedMatches.map((item) => (
        <div key={item.id} className="tourner rounded-xl cursor-pointer p-2">
          <div
            className="flex items-center justify-between"
            onClick={(e) => toggleTournament(item.id, e)}
          >
            <div className="flex gap-2 items-center">
              <span className="mr-2">
                <LuCrown size={30} />
              </span>
              <h2 className="font-bold text-[24px]">{item.name}</h2>
            </div>
            <IoIosArrowDown
              className={`transition-transform ${
                openTournaments.includes(item.id.toString()) ? "rotate-180" : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {openTournaments.includes(item.id.toString()) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ul className="flex mt-2 flex-col gap-2">
                  {item.matches.map((match) => (
                    <motion.li
                      key={match.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="match h-28 flex items-center justify-between p-4 rounded-xl"
                    >
                      <div className="flex flex-col items-center flex-1">
                        <img
                          className="w-8 h-8 object-inherit"
                          src={baseUrl + "/" + (match.team_1?.icon_path || "")}
                          alt=""
                        />
                        <p className="text-[14px] text-center mt-2">
                          {match.team_1?.name || "Team 1"}
                        </p>
                        <button
                          className="text-xs bg-[#10b981] text-white px-3 py-1 rounded-md mt-1 hover:bg-[#0d9e6e] transition-colors"
                          onClick={(e) => handleOddClick(match, "team_1", e)}
                        >
                          {Number(match.team_1_coefficient).toFixed(2) ||
                            "1.00"}
                        </button>
                      </div>

                      <div className="mx-4 text-center">
                        <p className="font-medium">VS</p>
                        <p className="text-xs text-gray-500">{match.time}</p>
                      </div>

                      <div className="flex flex-col items-center flex-1">
                        <img
                          className="w-8 h-8 object-inherit"
                          src={baseUrl + "/" + (match.team_2?.icon_path || "")}
                          alt=""
                        />
                        <p className="text-[14px] text-center mt-2">
                          {match.team_2?.name || "Team 2"}
                        </p>
                        <button
                          className="text-xs bg-[#10b981] text-white px-3 py-1 rounded-md mt-1 hover:bg-[#0d9e6e] transition-colors"
                          onClick={(e) => handleOddClick(match, "team_2", e)}
                        >
                          {Number(match.team_2_coefficient).toFixed(2) ||
                            "1.00"}
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <DoBet
        selectedMatch={selectedMatch}
        selectedOdd={selectedOdd}
        betAmount={betAmount}
        setSelectedMatch={setSelectedMatch}
        setSelectedOdd={setSelectedOdd}
        setBetAmount={setBetAmount}
        placeBet={placeBet}
      />
    </section>
  );
};

export default Tourner;
