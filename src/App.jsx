import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PrivateRoute from "./features/privateRoute/privateRoute";
import Footer from "./page/Footer/Footer";
import HeroHeader from "./page/HeroHeader/HeroHeader";
import Login from "./page/Login/Login";
import NavBar from "./page/NavBar/NavBar";
import PageError from "./page/PageError/PageError";
import User from "./page/User/User";

function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />{" "}
            {/* C'est ici que le contenu des routes enfants sera rendu */}
            <Footer />
        </>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HeroHeader />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "user",
                element: (
                    <PrivateRoute>
                        <User />
                    </PrivateRoute>
                ),
            },
            {
                path: "*",
                element: <PageError />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
