import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/Overview";
import Favorites from "./pages/Favorites";
import useStore from "./store/useStore";
import { useEffect } from "react";

function App() {
  const { fetchProducts, fetchCategories } = useStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    window.toast = {
      success: (msg) =>
        window
          .Toastify({
            text: msg,
            duration: 3000,
            style: { background: "green" },
          })
          .showToast(),
      error: (msg) =>
        window
          .Toastify({ text: msg, duration: 3000, style: { background: "red" } })
          .showToast(),
    };
  }, [fetchProducts, fetchCategories]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    
    {
      path: "/products",
      element: <Products />,
    },
    
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
