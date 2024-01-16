import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      📻Entertainment hub📻
    </span>
  );
};

export default Header;
