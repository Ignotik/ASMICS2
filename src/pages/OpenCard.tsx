import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCardsStore, type Card } from "../utils/store/CardStore";

const OpenPackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonCard, setWonCard] = useState<Card | null>(null);
  const [displayCards, setDisplayCards] = useState<Card[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  // Получаем данные из store
  const { cards, fetchAllCards, fetchRandomCard } = useCardsStore();

  const preloadImages = (cards: Card[]) => {
    cards.forEach((card) => {
      const img = new Image();
      img.src = `https://protecting-crimes-shore-managed.trycloudflare.com${card.image}`;
    });
  };

  const startSpin = async () => {
    if (isSpinning || cards.length === 0) return;

    setIsSpinning(true);
    setWonCard(null);

    const repeatedCards = Array(10).fill(cards).flat();
    setDisplayCards(repeatedCards);
    preloadImages(repeatedCards);

    // Даем время для рендера карт перед анимацией
    await new Promise((resolve) => setTimeout(resolve, 50));

    const wonCard = await fetchRandomCard();
    const cardWidth = 140;
    const cardMargin = 16;
    const totalCardWidth = cardWidth + cardMargin;

    if (!containerRef.current || !cardsContainerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const cardsContainerWidth = cardsContainerRef.current.scrollWidth;

    // Находим все позиции выигрышной карты
    const wonCardPositions: number[] = [];
    repeatedCards.forEach((card, index) => {
      if (card.id === wonCard.id) {
        wonCardPositions.push(index * totalCardWidth);
      }
    });

    // Выбираем позицию ближе к середине для остановки
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

    // Устанавливаем таймер для завершения анимации
    setTimeout(() => {
      setIsSpinning(false);
      setWonCard(wonCard);
    }, 4000);
  };

  useEffect(() => {
    // Загружаем карты при монтировании компонента, если они еще не загружены
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

  const CardItem = React.memo(({ card }: { card: Card }) => (
    <div className="flex-shrink-0 text-center w-[140px] h-[250px] mx-2 bg-gray-700 rounded-lg flex flex-col items-center justify-center">
      <div className="flex justify-center overflow-hidden">
        <img
          src={`https://protecting-crimes-shore-managed.trycloudflare.com${card.image}`}
          alt={card.name}
          className="w-[140px] rounded-t-xl"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="text-[12px] font-bold mx-2 mt-2">{card.name}</p>
    </div>
  ));

  return (
    <div className="min-h-screen text-white p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Открытие кейса</h1>

      <div className="w-full max-w-4xl mb-4" ref={containerRef}>
        {/* Указатель центра */}
        <div className="flex justify-center mb-1">
          <div className="text-red-500 text-3xl">▼</div>
        </div>

        {/* Область рулетки */}
        <div className="relative p-2 overflow-hidden border-2 border-gray-700 rounded-lg bg-gray-800">
          <div ref={cardsContainerRef} className="flex will-change-transform">
            {displayCards.map((card, index) => (
              <CardItem key={`${card.id}-${index}`} card={card} />
            ))}
          </div>
        </div>
      </div>

      {/* Выигранная карта */}
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
