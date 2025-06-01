import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCardsStore, type Card } from "../utils/store/CardStore";
import { CardItem } from "../components/Cards/Card";
import { baseUrl } from "../utils/consts/url-backend";

const OpenPackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonCard, setWonCard] = useState<Card | null>(null);
  const [displayCards, setDisplayCards] = useState<Card[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  const { cards, fetchAllCards, fetchRandomCard } = useCardsStore();

  const preloadImages = (cards: Card[]) => {
    cards.forEach((card) => {
      const img = new Image();
      img.src = `${baseUrl}${card.image}`;
    });
  };

  const startSpin = async () => {
    if (isSpinning || cards.length === 0) return;

    setIsSpinning(true);
    setWonCard(null);

    const repeatedCards = Array(10).fill(cards).flat();
    setDisplayCards(repeatedCards);
    preloadImages(repeatedCards);

    await new Promise((resolve) => setTimeout(resolve, 50));

    const wonCard = await fetchRandomCard();
    const cardWidth = 140;
    const cardMargin = 16;
    const totalCardWidth = cardWidth + cardMargin;

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

    // Добавляем CSS класс для анимации
    if (cardsContainerRef.current) {
      cardsContainerRef.current.style.transition = "none";
      cardsContainerRef.current.style.transform = "translateX(0)";

      // Запускаем анимацию
      requestAnimationFrame(() => {
        if (cardsContainerRef.current) {
          cardsContainerRef.current.style.transition =
            "transform 4s cubic-bezier(0.2, 0.8, 0.4, 1)";
          cardsContainerRef.current.style.transform = `translateX(-${finalTargetPosition}px)`;
        }
      });
    }

    setTimeout(() => {
      setIsSpinning(false);
      setWonCard(wonCard);
    }, 4000);
  };

  useEffect(() => {
    if (cards.length === 0) {
      fetchAllCards().then(() => {
        startSpin();
      });
    } else {
      startSpin();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [id, cards.length]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen text-white p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Открытие кейса</h1>

      <div className="w-full max-w-4xl mb-4" ref={containerRef}>
        <div className="flex justify-center mb-1">
          <div className="text-red-500 text-3xl">▼</div>
        </div>
        <div className="relative p-2 overflow-hidden border-2 border-gray-700 rounded-lg bg-gray-800">
          <div ref={cardsContainerRef} className="flex will-change-transform">
            {displayCards.map((card, index) => (
              <CardItem key={`${card.id}-${index}`} card={card} />
            ))}
          </div>
        </div>
      </div>

      {wonCard && (
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold mb-2">Вы выиграли:</h2>
          <div className="w-[140px] h-[200px] bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex flex-col items-center justify-center mx-auto">
            <div className="flex justify-center overflow-hidden h-[140px] w-full">
              <img
                src={wonCard.image}
                alt={wonCard.name}
                className="w-full h-full object-cover rounded-t-xl"
              />
            </div>
            <p className="text-sm font-bold m-2 line-clamp-2">{wonCard.name}</p>
          </div>
        </div>
      )}

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
