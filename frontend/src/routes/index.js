
import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import About from "../pages/About";
import Info from "../pages/Info";
import InfoUser from "../pages/InfoUser";


export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "info",
                element: <Info />
            },
            {
                path: "infoUser",
                element: <InfoUser />
            }
        ]
    }
]

