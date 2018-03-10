import React from "react";

const Jumbotron = ({ children }) =>
  <div style={{ height: 300, clear: 'both' }} id="search" className="jumbotron">
    {children}
  </div>;

export default Jumbotron;
