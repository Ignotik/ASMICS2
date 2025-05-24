import React from "react";
import Banner from "./Banner";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Banner />
      {children}
    </>
  );
};

export default Layout;
