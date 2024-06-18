// 라이브러리
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// 서비스
// 레이아웃
import RootLayout from "./layouts/root/layout";
import DashboardLayout from "./layouts/dashboard/layout";
// 페이지
import MainPage from "./pages/main/page";
import IntroductionPage from "./pages/introduction/page";
import MemberPage from "./pages/member/page";
import ProjectPage from "./pages/project/page";
import NewsPage from "./pages/news/page";
import AuthPage from "./pages/auth/page";
import ManageMemberPage from "./pages/manageMember/page";
import ManageProjectPage from "./pages/manageProject/page";
import ManageNewsPage from "./pages/manageNews/page";
// 스타일
import "./index.css";
import "./custom.css";
import { useEffect } from "react";

const isAuthenticated = () => {
  // return localStorage.getItem("authenticated") === "true";
  return sessionStorage.getItem("authenticated") === "true";
};

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/site/auth" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/site",
        element: <MainPage />,
      },
      {
        path: "/site/introduction",
        element: <IntroductionPage />,
      },
      {
        path: "/site/member",
        element: <MemberPage />,
      },
      {
        path: "/site/project",
        element: <ProjectPage />,
      },
      {
        path: "/site/news",
        element: <NewsPage />,
      },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/site/manage/member",
        element: <ManageMemberPage />,
      },
      {
        path: "/site/manage/project",
        element: <ManageProjectPage />,
      },
      {
        path: "/site/manage/news",
        element: <ManageNewsPage />,
      },
    ],
  },
  {
    path: "/site/auth",
    element: <AuthPage />,
  },
  {
    basename: "https://ubse-lab.github.io/site",
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
