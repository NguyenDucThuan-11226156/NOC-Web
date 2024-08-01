
import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import About from "../pages/Cart";
import Info from "../pages/Info";


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
            }
        ]
    }
]

