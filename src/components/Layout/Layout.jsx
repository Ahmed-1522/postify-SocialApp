import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./../Footer/Footer";
import { Helmet } from "react-helmet";

export default function Layout() {
  const location = useLocation();
  const [currentTitle, setCurrentTitle] = useState("Postify - Social App");

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/home":
        return "Postify - Home";
      case "/profile":
        return "Postify - Profile";
      case "/login":
        return "Postify - Login";
      case "/register":
        return "Postify - Register";
      default:
        if (location.pathname.startsWith("/postdetails/")) {
          return "Postify - Post Details";
        }
        return "Postify - Social App"; // العنوان الافتراضي
    }
  };

  useEffect(() => {
    const newTitle = getTitle();
    setCurrentTitle(newTitle);
    // كمان نحديث document.title مباشرة كـ fallback
    document.title = newTitle;
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{currentTitle}</title>
        <meta
          name="description"
          content="Postify - Connect, Share, and Engage with your friends"
        />
        <meta
          name="keywords"
          content="social media, posts, comments, sharing"
        />
        <meta property="og:title" content={currentTitle} />
        <meta
          property="og:description"
          content="Connect, Share, and Engage with your friends on Postify"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      <div className="m-0 py-12 bg-[url('/bg.jpg')]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
