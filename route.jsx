import { Route, Routes } from "react-router-dom";
import Home from "/src/pages/home";
import AboutUs from "./src/pages/about-us";
import Login from "./src/pages/auth/login";
import Register from "./src/pages/auth/register";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
