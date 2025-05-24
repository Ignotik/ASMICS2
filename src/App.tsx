import { BrowserRouter } from "react-router-dom";
import AppRoute from "./app/AppRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </>
  );
}

export default App;
