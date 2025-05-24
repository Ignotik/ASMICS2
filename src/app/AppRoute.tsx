import React from "react";
import Layout from "../components/Layout/Layout";
import { useRoutes } from "react-router-dom";
import { routes } from "../utils/router";

const AppRoute: React.FC = () => {
  const routing = useRoutes(routes);
  return (
    <>
      <div className="p-2.5">
        <Layout>{routing}</Layout>
      </div>
    </>
  );
};

export default AppRoute;
