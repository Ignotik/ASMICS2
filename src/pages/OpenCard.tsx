import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Niko from "../assets/Niko.jpg";

interface Card {
  id: number;
  image: string;
  name: string;
  rarity: string;
  weight: number;
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

  const caseCards: Card[] = [
    {
      id: 1,
      image: "/card3.png",
      name: "Редкая карта 1",
      rarity: "rare1",
      weight: 10,
    },
    {
      id: 2,
      image: "/card2.png",
      name: "Обычная карта",
      rarity: "common1",
      weight: 20,
    },
    {
      id: 3,
      image: "/card3.png",
      name: "Эпическая карта",
      rarity: "epic",
      weight: 10,
    },
    {
      id: 4,
      image: Niko,
      name: "Niko 2019 - Blast Fall Final",
      rarity: "legendary",
      weight: 60,
    },
    {
      id: 5,
      image: "/card5.png",
      name: "Обычная карта 2",
      rarity: "common",
      weight: 20,
    },
    {
      id: 6,
      image: "/card6.png",
      name: "Редкая карта 2",
      rarity: "rare",
      weight: 10,
    },
  ];

  const getRandomCard = (): Card => {
    const totalWeight = caseCards.reduce((sum, card) => sum + card.weight, 0);
    let random = Math.random() * totalWeight;

    for (const card of caseCards) {
      if (random < card.weight) {
        return card;
      }
      random -= card.weight;
    }

    return caseCards[0];
  };

  const startSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonCard(null);

    const repeatedCards = Array(10).fill(caseCards).flat();
    setDisplayCards(repeatedCards);

    const spinDuration = 4000;
    const startTime = Date.now();
    const startPosition = 0;
    const cardWidth = 160;
    const cardMargin = 16;
    const totalCardWidth = cardWidth + cardMargin;
    const wonCard = getRandomCard();

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
                className="flex-shrink-0 text-center w-[160px] h-[250px] mx-2 bg-gray-700 rounded-lg flex flex-col items-center justify-center"
              >
                <div className=" flex justify-center overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-[160px] rounded-t-xl"
                  />
                </div>
                <p className="text-lg font-bold m-2">{card.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Выигранная карта */}
      {wonCard && (
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold mb-4">Вы выиграли:</h2>
          <div className="w-[160px] h-[250px] bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex flex-col items-center justify-center mx-auto">
            <div className=" flex justify-center overflow-hidden">
              <img
                src={wonCard.image}
                alt={wonCard.name}
                className="w-[160px] rounded-t-xl"
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
