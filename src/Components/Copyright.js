import React from "react";
import "./Copyright.css";

const CopyrightSection = () => {
  return (
    <div className="copyright__section">
      <h1>
        @This <strong>COVID-19 Tracker</strong> is Built by{" "}
        <a href="https://www.azharzaman.com" target="_blank">
          Azhar Zaman
        </a>
        with <strong>React</strong> to Showcase Skills@
      </h1>
    </div>
  );
};

export default CopyrightSection;
