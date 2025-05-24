import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuCrown } from "react-icons/lu";
import "./tourner.css";
import axios from "axios";

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

  const getTournaments = async (tournaments: string[]) => {
    try {
      setLoading(true);
      const response = await axios.get<Tournament[]>(
        `http://127.0.0.1:8000/betboom/?${tournaments
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
    // Пример запроса с двумя турнирами
    getTournaments([
      "intel-extreme-masters-dallas-2025",
      "blast-tv-austin-major-2025",
    ]);
  }, []);

  const toggleTournament = (tournament: string) => {
    setOpenTournaments((prev) =>
      prev.includes(tournament)
        ? prev.filter((item) => item !== tournament)
        : [...prev, tournament]
    );
  };

  if (loading) return <div className="text-center py-4">Загрузка...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <section className="mt-4 flex flex-col gap-4">
      <p className="font-bold text-[20px]">Турниры</p>
      {data.map((item) => (
        <div
          key={item.id}
          className="tourner rounded-xl cursor-pointer p-2"
          onClick={() => toggleTournament(item.tournament)}
        >
          <div className="flex items-center justify-between">
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

          {openTournaments.includes(item.tournament) && (
            <ul className="flex mt-2 flex-col gap-2">
              {item.matches.map((match, index) => (
                <li
                  key={index}
                  className="match h-28 flex items-center justify-between p-4 rounded-xl"
                >
                  <div className="flex flex-col items-center flex-1">
                    {match.logo1 ? (
                      <img
                        className="w-10 h-10 object-contain"
                        src={match.logo1}
                        alt={match.team1}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    )}
                    <p className="text-[14px] text-center mt-2">
                      {match.team1}
                    </p>
                    {match.odds.team1 && (
                      <span className="text-xs text-gray-500 mt-1">
                        {match.odds.team1.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="mx-4 text-center">
                    <p className="font-medium">{match.time}</p>
                  </div>

                  <div className="flex flex-col items-center flex-1">
                    {match.logo2 ? (
                      <img
                        className="w-10 h-10 object-contain"
                        src={match.logo2}
                        alt={match.team2}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    )}
                    <p className="text-[14px] text-center mt-2">
                      {match.team2}
                    </p>
                    {match.odds.team2 && (
                      <span className="text-xs text-gray-500 mt-1">
                        {match.odds.team2.toFixed(2)}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default Tourner;
