import React from "react";
import { NormalFiguresToCommas } from "../Files/utilities";

const Table = ({ listData, className }) => {
  return (
    <div className={`table ${className}`}>
      {listData.map(({ country, cases }) => (
        <tr className="tableRow flexRow between center">
          <td>{country}</td>
          <td>
            <strong> {NormalFiguresToCommas(cases)} </strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
