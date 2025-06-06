import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useRoutes } from "react-router-dom";
import { routes } from "../utils/router";
import { useCardsStore } from "../utils/store/CardStore";
import axios from "axios";
import { baseUrl } from "../utils/consts/url-backend";
import { useTelegram } from "../hooks/useTelegramm";
import { useAuthStore } from "../utils/store/AuthStore";

const AppRoute: React.FC = () => {
  const routing = useRoutes(routes);
  const { fetchAllCards } = useCardsStore();
  const { setUser, setIsAuth } = useAuthStore();
  const { userId, user, name } = useTelegram();
  const [loading, setLoading] = useState(true);

  const authWithTelegram = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/telegram`, {
        telegram_id: userId,
        username: user,
        admin: "no",
      });

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        setUser({
          telegramId: userId,
          username: user,
          name: name || "",
          isAdmin: response.data.user?.admin || false,
        });
        console.log("Telegram auth successful");
        setIsAuth(true);
      }
    } catch (error) {
      console.error("Telegram auth failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && user) {
      authWithTelegram();
    } else {
      setLoading(false);
    }
    fetchAllCards();
  }, [userId, user, fetchAllCards]);

  if (loading) {
    return <div className="p-2.5">Загрузка...</div>;
  }

  return (
    <>
      <div className="p-2.5">
        <Layout>{routing}</Layout>
      </div>
    </>
  );
};

export default AppRoute;
