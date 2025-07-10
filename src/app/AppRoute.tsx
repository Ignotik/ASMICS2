import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useTelegram } from "../hooks/useTelegramm";
import { routes } from "../utils/router";

const AppRoute: React.FC = () => {
  const routing = useRoutes(routes);
  const { initData, isWebAppAvailable } = useTelegram();

  useEffect(() => {
    if (isWebAppAvailable) {
      console.log("Telegram WebApp data:", initData);
    } else {
      console.warn("Приложение запущено вне Telegram");
    }
  }, [initData, isWebAppAvailable]);

  return (
    <div className="p-2.5">
      <Layout>{routing}</Layout>
    </div>
  );
};

export default AppRoute;
