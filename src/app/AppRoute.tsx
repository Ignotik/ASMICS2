import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useRoutes } from "react-router-dom";
import { routes } from "../utils/router";
import { useTelegram } from "../hooks/useTelegramm";

const AppRoute: React.FC = () => {
  const routing = useRoutes(routes);
  const { initData } = useTelegram();

  useEffect(() => {
    console.log(initData);
  }, [initData]);

  return (
    <>
      <div className="p-2.5">
        <Layout>{routing}</Layout>
      </div>
    </>
  );
};

export default AppRoute;
