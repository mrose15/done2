import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Projects from "./routes/Projects.tsx";
import Profile from "./routes/Profile.tsx";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3025/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.data;
        } catch (error) {
          return {};
        }
      } else {
        return {};
      }
    },
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          const token = localStorage.getItem("token");

          if (token) {
            try {
              const response = await axios.get(
                "http://localhost:3025/auth/profile",
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return response.data;
            } catch (error) {
              console.log(error);
              return redirect("/login");
            }
          } else {
            return redirect("/login");
          }

          return "LOADER";
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
