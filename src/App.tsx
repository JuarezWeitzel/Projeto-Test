import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Cadastro } from "./pages/Cadastro";
import { Layout } from "./components/Layout";

const router = createBrowserRouter([
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/cadastro",
        element: <Cadastro/>
      },
])

export { router }