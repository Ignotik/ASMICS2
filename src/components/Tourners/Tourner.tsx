import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuCrown } from "react-icons/lu";
import "./tourner.css";
import axios from "axios";
import { baseUrl } from "../../utils/consts/url-backend";
import { motion, AnimatePresence } from "framer-motion";
import DoBet from "../DoBet/DoBet";

interface Odd {
  team1: number | null;
  team2: number | null;
}

interface Match {
  team1: string;
  team2: string;
  logo1: string | null;
  logo2: string | null;
  time: string;
  odds: Odd;
}

interface Tournament {
  id: number;
  tournament: string;
  matches: Match[];
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

  const getTournaments = async (tournaments: string[]) => {
    try {
      setLoading(true);
      const response = await axios.get<Tournament[]>(
        `${baseUrl}/betboom/?${tournaments
          .map((t) => `tournaments=${encodeURIComponent(t)}`)
          .join("&")}`
      );
      setData(response.data);
      setError(null);
    } catch (err) {
      setError("Ошибка при загрузке данных");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTournaments([
      "intel-extreme-masters-dallas-2025",
      "blast-tv-austin-major-2025-stage-1",
      "blast-tv-austin-major-2025-stage-2",
      "blast-tv-austin-major-2025",
      "cct-season-3-european-series-2",
    ]);
  }, []);

  const toggleTournament = (tournament: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTournaments((prev) =>
      prev.includes(tournament)
        ? prev.filter((item) => item !== tournament)
        : [...prev, tournament]
    );
  };

  const handleOddClick = (
    match: Match,
    team: "team1" | "team2",
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const oddValue = match.odds[team];
    if (oddValue) {
      setSelectedMatch(match);
      setSelectedOdd({
        team: team === "team1" ? match.team1 : match.team2,
        value: oddValue,
      });
    }
  };

  const placeBet = () => {
    if (selectedMatch && selectedOdd && betAmount > 0) {
      alert(
        `Ставка принята: ${selectedOdd.team} (коэф. ${selectedOdd.value}) на сумму ${betAmount}`
      );
      setSelectedMatch(null);
      setSelectedOdd(null);
    }
  };

  const validTournaments = data.filter(
    (item): item is Tournament =>
      item !== null && item.matches && item.matches.length > 0
  );

  if (loading) return <div className="text-center py-4">Загрузка...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <section className="mt-4 flex flex-col gap-4">
      <p className="font-bold text-[20px]">Турниры</p>
      {validTournaments.map((item) => (
        <div key={item.id} className="tourner rounded-xl cursor-pointer p-2">
          <div
            className="flex items-center justify-between"
            onClick={(e) => toggleTournament(item.tournament, e)}
          >
            <div className="flex gap-2 items-center">
              <span className="mr-2">
                <LuCrown size={30} />
              </span>
              <h2 className="font-bold text-[24px]">{item.tournament}</h2>
            </div>
            <IoIosArrowDown
              className={`transition-transform ${
                openTournaments.includes(item.tournament) ? "rotate-180" : ""
              }`}
            />
          </div>

          <AnimatePresence>
            {openTournaments.includes(item.tournament) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ul className="flex mt-2 flex-col gap-2">
                  {item.matches.map((match, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="match h-28 flex items-center justify-between p-4 rounded-xl"
                    >
                      <div className="flex flex-col items-center flex-1">
                        {match.logo1 ? (
                          <motion.img
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                            className="w-10 h-10 object-contain"
                            src={match.logo1}
                            alt={match.team1}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                            className="w-10 h-10 bg-gray-200 rounded-full"
                          />
                        )}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.15 }}
                          className="text-[14px] text-center mt-2"
                        >
                          {match.team1}
                        </motion.p>
                        {match.odds.team1 && (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 + 0.2 }}
                            className="text-xs bg-[#10b981] text-white px-3 py-1 rounded-md mt-1 hover:bg-[#0d9e6e] transition-colors"
                            onClick={(e) => handleOddClick(match, "team1", e)}
                          >
                            {match.odds.team1.toFixed(2)}
                          </motion.button>
                        )}
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.25 }}
                        className="mx-4 text-center"
                      >
                        <p className="font-medium">{match.time}</p>
                      </motion.div>

                      <div className="flex flex-col items-center flex-1">
                        {match.logo2 ? (
                          <motion.img
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                            className="w-10 h-10 object-contain"
                            src={match.logo2}
                            alt={match.team2}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                            className="w-10 h-10 bg-gray-200 rounded-full"
                          />
                        )}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.15 }}
                          className="text-[14px] text-center mt-2"
                        >
                          {match.team2}
                        </motion.p>
                        {match.odds.team2 && (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 + 0.2 }}
                            className="text-xs bg-[#10b981] text-white px-3 py-1 rounded-md mt-1 hover:bg-[#0d9e6e] transition-colors"
                            onClick={(e) => handleOddClick(match, "team2", e)}
                          >
                            {match.odds.team2.toFixed(2)}
                          </motion.button>
                        )}
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
