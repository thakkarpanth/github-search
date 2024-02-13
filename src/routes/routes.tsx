import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";

const AppRoutes = () => (
  <Routes>
    <Route path="/github-search" element={<Home />} />
  </Routes>
);

export default AppRoutes;
