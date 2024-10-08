import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./page/Footer/Footer";
import HeroHeader from "./page/HeroHeader/HeroHeader";
import Login from "./page/Login/Login";
import NavBar from "./page/NavBar/NavBar";
import PageError from "./page/PageError/PageError";
import User from "./page/User/User";

// Layout qui contient le NavBar et Footer, et l'Outlet pour les enfants
function Layout() {
    return (
        <body>
            <NavBar />
            <Outlet />{" "}
            {/* C'est ici que le contenu des routes enfants sera rendu */}
            <Footer />
        </body>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Layout qui inclut NavBar, Outlet et Footer
        children: [
            {
                path: "/",
                element: <HeroHeader />, // Affiche HeroHeader à la racine "/"
            },
            {
                path: "login",
                element: <Login />, // Affiche Login à "/login"
            },
            {
                path: "user",
                element: <User />, // Affiche User à "/user"
            },
            {
                path: "*",
                element: <PageError />, // Affiche PageError pour toutes les autres routes
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
