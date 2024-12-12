import React from "react";

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./layout/Root";
import DashBoard from "./pages/DashBoard";
import Navbar from "./pages/Navbar";
import Banner from "./pages/Banner";
import NewProduct from "./pages/NewProduct";
import ShopTime from "./pages/ShopTime";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Root />}>
    <Route path="/" element={<DashBoard />} />
    <Route path="/shop_time" element={<ShopTime />} />
    <Route path="/navbar" element={<Navbar />} />
    <Route path="/banner" element={<Banner />} />
    <Route path="/new_product" element={<NewProduct />} />
  </Route>)
);

const App = () => {
  return (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );
};

export default App;
