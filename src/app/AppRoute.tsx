import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useTelegram } from "../hooks/useTelegramm";
import { routes } from "../utils/router";
import axios from "axios";
import { baseUrl } from "../utils/consts/url-backend";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useUserStore } from "../utils/store/UserStore";

const AppRoute: React.FC = () => {
  const routing = useRoutes(routes);
  const { initData } = useTelegram();
  const { setUser } = useUserStore();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axios.post(`${baseUrl}/auth`, { initData });
        const token = response.data;
        const decoded = jwtDecode<JwtPayload>(token);

        const userResponse = await axios.get(
          `${baseUrl}/users/${decoded.sub}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(userResponse.data);
        localStorage.setItem("authToken", token);
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };

    if (initData) authenticate();
  }, [initData]);

  return (
    <div className="p-2.5">
      <Layout>{routing}</Layout>
    </div>
  );
};

export default AppRoute;
