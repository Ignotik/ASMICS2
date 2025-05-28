import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import common from "../assets/COMMON.jpg";
import axios from "axios";

interface Card {
  id: number;
  image: string;
  name: string;
  rarity: string;
  weight: number;
  description: string[];
}

const OpenPackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonCard, setWonCard] = useState<Card | null>(null);
  const [displayCards, setDisplayCards] = useState<Card[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const fetchRandomCard = async (): Promise<Card> => {
    try {
      const response = await axios.get<Card>(
        "https://crazy-raymond-parallel-marvel.trycloudflare.com/get-random-card"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching random card:", error);
      // Fallback карта если бэкенд недоступен
      return {
        id: 0,
        image: common,
        name: "Обычная карта (fallback)",
        rarity: "common",
        description: ["Default description"],
        weight: 20,
      };
    }
  };

  const fetchAllCards = async (): Promise<Card[]> => {
    try {
      const response = await axios.get<Card[]>(
        "https://crazy-raymond-parallel-marvel.trycloudflare.com/get-all-cards"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all cards:", error);
      return []; // Возвращаем пустой массив в случае ошибки
    }
  };

  const startSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonCard(null);

    // Получаем все карты с бэкенда для отображения в рулетке
    const allCards = await fetchAllCards();
    const repeatedCards = Array(10).fill(allCards).flat();
    setDisplayCards(repeatedCards);

    const spinDuration = 4000;
    const startTime = Date.now();
    const startPosition = 0;
    const cardWidth = 140;
    const cardMargin = 16;
    const totalCardWidth = cardWidth + cardMargin;
    const wonCard = await fetchRandomCard();

    setTimeout(() => {
      if (!containerRef.current || !cardsContainerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const cardsContainerWidth = cardsContainerRef.current.scrollWidth;

      const wonCardPositions: number[] = [];
      repeatedCards.forEach((card, index) => {
        if (card.id === wonCard.id) {
          wonCardPositions.push(index * totalCardWidth);
        }
      });

      const middlePosition = Math.floor(wonCardPositions.length / 2);
      const targetCardPosition = wonCardPositions[middlePosition];
      const targetPosition =
        targetCardPosition - (containerWidth / 2 - cardWidth / 2);
      const maxPosition = cardsContainerWidth - containerWidth;
      const finalTargetPosition = Math.min(targetPosition, maxPosition);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);

        const easing = (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        if (progress < 1) {
          const currentPosition =
            startPosition +
            (finalTargetPosition - startPosition) * easing(progress);
          setScrollPosition(currentPosition);
          requestAnimationFrame(animate);
        } else {
          setScrollPosition(finalTargetPosition);
          setIsSpinning(false);
          setWonCard(wonCard);
        }
      };

      animate();
    }, 50);
  };

  useEffect(() => {
    startSpin();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen  text-white p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">Открытие кейса</h1>

      <div className="w-full max-w-4xl mb-8" ref={containerRef}>
        {/* Указатель центра */}
        <div className="flex justify-center mb-2">
          <div className="text-red-500 text-4xl">▼</div>
        </div>

        {/* Область рулетки */}
        <div className="relative p-5 h-72 overflow-hidden border-2 border-gray-700 rounded-lg bg-gray-800">
          <div
            ref={cardsContainerRef}
            className="flex transition-transform duration-100"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {displayCards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="flex-shrink-0 text-center w-[140px] h-[250px] mx-2 bg-gray-700 rounded-lg flex flex-col items-center justify-center"
              >
                <div className=" flex justify-center overflow-hidden">
                  <img
                    src={`https://crazy-raymond-parallel-marvel.trycloudflare.com${card.image}`}
                    alt={card.name}
                    className="w-[140px] rounded-t-xl"
                  />
                </div>
                <p className="text-[12px] font-bold mx-2 mt-2">{card.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Выигранная карта */}
      {wonCard && (
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold mb-4">Вы выиграли:</h2>
          <div className="w-[140px] h-[250px] bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex flex-col items-center justify-center mx-auto">
            <div className=" flex justify-center overflow-hidden">
              <img
                src={wonCard.image}
                alt={wonCard.name}
                className="w-[140px] rounded-t-xl"
              />
            </div>
            <p className="text-lg font-bold m-2">{wonCard.name}</p>
          </div>
        </div>
      )}

      {/* Кнопка назад */}
      <button
        onClick={handleBackClick}
        className="mt-4 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Назад
      </button>
    </div>
  );
};

export default OpenPackPage;
