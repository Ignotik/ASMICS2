import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuCrown } from "react-icons/lu";
import "./tourner.css";
import axios from "axios";
import { baseUrl } from "../../utils/consts/url-backend";
import { motion, AnimatePresence } from "framer-motion";
import DoBet from "../DoBet/DoBet";

export interface Team {
  id: number;
  name: string; // убрали "?" - теперь name обязателен
  coefficient: number;
  icon_path?: string | null;
}

interface Match {
  id: number;
  team_1_coefficient: string;
  team_2_coefficient: string;
  started_at: string;
  results_announced_at: string | null;
  created_at: string;
  updated_at: string;
  team_1: Team;
  team_2: Team;
  time?: string;
}

interface Tournament {
  id: number;
  name: string;
  matches: Match[];
  closed_at: string | null;
  created_at: string;
  updated_at: string;
}
const Tourner: React.FC = () => {
  const [openTournaments, setOpenTournaments] = useState<string[]>([]);
  const [data, setData] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [selectedOdd, setSelectedOdd] = useState<{
    team: string;
    value: number;
  } | null>(null);

  const getTournaments = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Tournament[]>(`${baseUrl}/tournaments/`);

      console.log("Matches details:");
      response.data.forEach((tournament, tournamentIndex) => {
        console.group(`Tournament ${tournamentIndex + 1}: ${tournament.name}`);
        tournament.matches.forEach((match, matchIndex) => {
          console.group(`Match ${matchIndex + 1}:`);
          console.log("Team 1:", {
            name: match.team_1.name,
            coefficient: match.team_1_coefficient,
            icon: match.team_1.icon_path,
          });
          console.log("Team 2:", {
            name: match.team_2.name,
            coefficient: match.team_2_coefficient,
            icon: match.team_2.icon_path,
          });
          console.log("Time:", new Date(match.started_at).toLocaleString());
          console.groupEnd();
        });
        console.groupEnd();
      });

      const formattedData = response.data.map((tournament) => ({
        ...tournament,
        matches: tournament.matches.map((match) => ({
          ...match,
          team1: {
            id: match.team_1.id,
            name: match.team_1.name,
            coefficient: parseFloat(match.team_1_coefficient),
            logo: match.team_1.icon_path,
          },
          team2: {
            id: match.team_2.id,
            name: match.team_2.name,
            coefficient: parseFloat(match.team_2_coefficient),
            logo: match.team_2.icon_path,
          },
          time: new Date(match.started_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })),
      }));

      setData(formattedData);
      setError(null);
    } catch (err) {
      setError("Ошибка при загрузке данных");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTournaments();
  }, []);

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
    team: "team1" | "team2",
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const selectedTeam = team === "team1" ? match.team_1 : match.team_2;
    setSelectedMatch(match);
    setSelectedOdd({
      team: selectedTeam.name,
      value: selectedTeam.coefficient,
    });
  };

  const placeBet = () => {
    if (!selectedMatch || !selectedOdd || betAmount <= 0) {
      console.error("Invalid bet data:", {
        selectedMatch,
        selectedOdd,
        betAmount,
      });
      return;
    }

    alert(
      `Ставка принята: ${selectedOdd.team} (коэф. ${selectedOdd.value}) на сумму ${betAmount}`
    );
    setSelectedMatch(null);
    setSelectedOdd(null);
  };
  if (loading) return <div className="text-center py-4">Загрузка...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;
  if (data.length === 0 || data.every((t) => t.matches.length === 0))
    return <div className="text-center py-4">Нет доступных матчей</div>;

  return (
    <section className="mt-4 flex flex-col gap-4">
      <p className="font-bold text-[20px]">Турниры</p>
      {data.map((item) => (
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
                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                        <p className="text-[14px] text-center mt-2">
                          {match.team_1?.name || "Team 1"}
                        </p>
                        <button
                          className="text-xs bg-[#10b981] text-white px-3 py-1 rounded-md mt-1 hover:bg-[#0d9e6e] transition-colors"
                          onClick={(e) => handleOddClick(match, "team1", e)}
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
                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                        <p className="text-[14px] text-center mt-2">
                          {match.team_2?.name || "Team 2"}
                        </p>
                        <button
                          className="text-xs bg-[#10b981] text-white px-3 py-1 rounded-md mt-1 hover:bg-[#0d9e6e] transition-colors"
                          onClick={(e) => handleOddClick(match, "team2", e)}
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
