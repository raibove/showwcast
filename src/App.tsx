import "./App.css";
import Header from "./components/header/Header";
import User from "./User";
import { useRoutes } from "react-router-dom";
import Company from "./Company";
import NotFound from "./components/not-found/NotFound";

const Layout = ({ routes }: any) => {
  return (
    <div className="App">
      <Header />
      <div className="main-content">{routes}</div>
    </div>
  );
};

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Company />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/company",
      element: <Company />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <Layout routes={routes} />;
}

export default App;
