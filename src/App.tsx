import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css'
import RootLayout from "./layouts/mainlayout";
import Home from "./pages/homepage";
import AuthLayout from "./layouts/authlayout";
import LoginPage from "./pages/loginpage";
import UploadPage from "./pages/upload";
import RegisterPage from "./pages/register";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import SkyPage from "./pages/profile/sky/skypage";
import RankingPage from "./pages/ranking";
import UserListPage from "./pages/admin/userlistpage";
import ProfilePage from "./pages/profile/profilepage";
import SettingPage from "./pages/admin/settingpage";

function App() {
  const routers = createBrowserRouter(
    [
      { 
        path: "/",
        element: <RootLayout />, 
        children: [
          { path: "/", element: <Home />},
          { 
            path: "/profile",
            element: <ProfilePage />,
            children: [
              {
                path: ":profile_id",
                element: <ProfilePage />
              }
            ]
          },
          {
            path: "/sky/:sky_id",
            element: <SkyPage />
          },
          { path: "/upload", element: <UploadPage />},
          { path: "/ranking", element: <RankingPage />},
        ],
        // errorElement: <ErrorPage/>
      },
      {
        path: "/admin",
        element: <RootLayout />,
        children: [
          {path: "users", element: <UserListPage/>},
          {path: "setting", element: <SettingPage/>},
        ]
      },
      {
        path: "/auth",
        element: <AuthLayout/>,
        children: [
          {path: "login", element: <LoginPage/>},
          {path: "register", element: <RegisterPage/>}
        ]
      }
    ]
  );
  return (
  <>
      <RouterProvider router={routers} />
      <ToastContainer />
  </>
  )
}

export default App
