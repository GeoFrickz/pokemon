import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PokemonList from "./Page/PokemonList";
import PokemonDetails from "./Page/PokemonDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PokemonList/>,
    },
    {
      path: "Details/:ID",
      element: <PokemonDetails />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;