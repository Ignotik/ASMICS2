import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useTelegram } from "../hooks/useTelegramm";
import { routes } from "../utils/router";

const AppRoute: React.FC = () => {
  const routing = useRoutes(routes);
  const { initData } = useTelegram();

  useEffect(() => {
    alert("Telegram WebApp data: " + initData);
    console.log(initData);
  }, [initData]);

  return (
    <div className="p-2.5">
      <Layout>{routing}</Layout>
    </div>
  );
};

export default AppRoute;
