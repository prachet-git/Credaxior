import { createBrowserRouter } from "react-router-dom";

import Root from "./pages/Root";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import AdminDashboard from "./pages/AdminDashboard";
import LenderDashboard from "./pages/LenderDashboard";
import BorrowerDashboard from "./pages/BorrowerDashboard";
import AnalystDashboard from "./pages/AnalystDashboard";

import LoanDetails from "./pages/LoanDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [

      { path: "register", element: <Register /> },
      
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },

   
      {
        path: "admin",
        element: (
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "lender",
        element: (
          <ProtectedRoute role="LENDER">
            <LenderDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "borrower",
        element: (
          <ProtectedRoute role="BORROWER">
            <BorrowerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "analyst",
        element: (
          <ProtectedRoute role="ANALYST">
            <AnalystDashboard />
          </ProtectedRoute>
        ),
      },

    
      {
        path: "loan/:id",
        element: (
          <ProtectedRoute>
            <LoanDetails />
          </ProtectedRoute>
        ),
      },

     
      { path: "*", element: <NotFound /> },
    ],
  },
]);
