import React from "react";
import "./List.css";

export const List = ({ children }) => {
  return (
    <div className="row">
      <ul className="list-group" id="listCard">
        {children}
      </ul>
    </div>
  );
};
