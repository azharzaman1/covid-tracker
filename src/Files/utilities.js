import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : +1));
};
// .......
export const NormalFiguresToCommas = (x) => {
  x = parseInt(x);
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};
// .......

export const prettyPrintStatPlus = (stat) => {
  if (stat > 10000) {
    return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
  } else {
    return `+${NormalFiguresToCommas(stat)}`;
  }
};

export const prettyPrintStat = (stat) => {
  if (stat > 10000) {
    return stat ? `${numeral(stat).format("0.0a")}` : "+0";
  } else {
    return NormalFiguresToCommas(stat);
  }
};

// ............

const mapTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 500,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 550,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 1800,
  },
};

export const showDataOnMap = (mapData, mapType = "cases") => {
  return mapData.map((countryMapData) => {
    return (
      <Circle
        className={countryMapData.country}
        center={[
          countryMapData.countryInfo.lat,
          countryMapData.countryInfo.long,
        ]}
        fillOpacity={0.4}
        color={mapTypeColors[mapType].hex}
        fillColor={mapTypeColors[mapType].hex}
        radius={
          Math.sqrt(countryMapData[mapType]) * mapTypeColors[mapType].multiplier
        }
      >
        <Popup>
          <div className="mapPopup__cont">
            <div
              className="mapPopup__flag"
              style={{
                backgroundImage: `url(${countryMapData.countryInfo.flag})`,
              }}
            />
            <div className="mapPopup__countryName">
              {countryMapData.country}
            </div>
            <div className="mapPopup__cases">
              Cases: {numeral(countryMapData.cases).format("0,0")}
            </div>
            <div className="mapPopup__recovered">
              Recovered: {numeral(countryMapData.recovered).format("0,0")}
            </div>
            <div className="mapPopup__deaths">
              Deaths: {numeral(countryMapData.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    );
  });
};
