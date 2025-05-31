import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useRoutes } from "react-router-dom";
import { routes } from "../utils/router";
import { useCardsStore } from "../utils/store/CardStore";

const AppRoute: React.FC = () => {
  const routing = useRoutes(routes);
  const { fetchAllCards } = useCardsStore();

  useEffect(() => {
    fetchAllCards();
  }, [fetchAllCards]);

  return (
    <>
      <div className="p-2.5">
        <Layout>{routing}</Layout>
      </div>
    </>
  );
};

export default AppRoute;
