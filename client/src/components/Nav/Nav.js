import React from "react";
import "./navStyle.css";

const Nav = () =>
  <nav className="navbar navbar-top">
    <div className="container-fluid" id="navBG">
      <div>
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <h1 id='navbar'>
          New York Times Article Scraper
        </h1>
        <br></br>
        <h3 id='navbar'> Search for articles from the New York Times</h3>
      </div>
    </div>
  </nav>;

export default Nav;
