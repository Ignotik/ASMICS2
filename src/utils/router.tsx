import Cards from "../pages/Cards";
import Main from "../pages/Main";
import OpenPackPage from "../pages/OpenCard";
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
    element: <div>Rating</div>,
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
    path: "/open-pack/:caseId",
    element: <OpenPackPage />,
  },
];
