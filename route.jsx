import { Route, Routes } from "react-router-dom";
import Home from "/src/pages/home";
import AboutUs from "./src/pages/about-us";
import Contact from "./src/pages/contact";
import Login from "./src/pages/auth/login";
import Register from "./src/pages/auth/register";
import Profile from "./src/pages/profile";
import { Articles } from "./src/pages/Articles";
import { CreateArticle } from "./src/pages/articles/Create";
import { ArticleDetail } from "./src/pages/articles/Detail";
import { EditArticle } from "./src/pages/articles/Edit";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/create" element={<CreateArticle />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route path="/articles/edit/:id" element={<EditArticle />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default Router;
