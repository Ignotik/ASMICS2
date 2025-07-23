import React from "react";
import Banner from "./Banner";
import Header from "./Header";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <Header />
      {location.pathname === "/admin" ? null : <Banner />}
      {children}
    </>
  );
};

export default Layout;
