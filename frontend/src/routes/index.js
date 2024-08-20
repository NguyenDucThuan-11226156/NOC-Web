import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import About from "../pages/About";
import Info from "../pages/Info";
import InfoUser from "../pages/InfoUser";
import AppAdmin from "../../src/admin/Layout";
import MentorDetailPage from "../components/MentorDetails";
import NormalLoginForm from "../admin/pages/Login";
import CreateCategory from "../admin/pages/CreateCategory";
import MentorsManagement from "../admin/pages/Mentors";
import SettingGeneral from "../admin/pages/SettingsGeneral";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "infoUser",
        element: <InfoUser />,
      },
      {
        path: "mentors/detail/:id", // Dynamic route for mentor detail
        element: <MentorDetailPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AppAdmin />,
    children: [
      {
        path: "",
        element: <MentorsManagement />,
      },
      {
        path: "category", // Route for creating categories
        element: <CreateCategory />,
      },
      {
        path: "setting",
        element: <SettingGeneral />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <NormalLoginForm />,
  },
];
