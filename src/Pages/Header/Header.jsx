import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styleComp from "./Header.module.scss";

function Header() {
  const navigate = useNavigate();
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);
  const [isLogin, setIsLogin] = useState(false);
  const cartList = useSelector((state) => state.products.items);
  
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={styleComp.headerContainer}>
      <p>E-commerce</p>
      <div className={styleComp.rightContainer}>
        <button
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        {isLogin && (
          <>
            <button>{cartList.length}</button>
            <button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
