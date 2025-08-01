import AdminPanel from "../pages/AdminPanelPage";
import AllTourner from "../pages/AllTourner";
import Bonus from "../pages/Bonus";
import Cards from "../pages/Cards";
import Main from "../pages/Main";
import OpenPackPage from "../pages/OpenCard";
import RatingPage from "../pages/RatingPage";
import Stavki from "../pages/Stavki";

export const routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/stavki",
    element: <Stavki />,
  },
  {
    path: "/statistic",
    element: <div>Statistic</div>,
  },
  {
    path: "/rating",
    element: <RatingPage />,
  },
  {
    path: "/faq",
    element: <div>FAQ</div>,
  },
  {
    path: "/cards",
    element: <Cards />,
  },
  {
    path: "tournaments",
    element: <AllTourner />,
  },
  {
    path: "/bonus",
    element: <Bonus />,
  },
  {
    path: "/open-pack/:caseId",
    element: <OpenPackPage />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
];
