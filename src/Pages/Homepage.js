import React, { useState, useEffect } from "react";
import TrackerLogo from "../tracker_logo.png";
import WorldwideIcon from "../worldwideIcon.png";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  Avatar,
  Container,
  makeStyles,
  Grid,
  useTheme,
} from "@material-ui/core";
import InfoBox from "../Components/InfoBox";
import Map from "../Components/Map";
import Table from "../Components/Table";
import LineGraph from "../Components/LineGraph";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Files/firebase";
import {
  sortData,
  NormalFiguresToCommas,
  prettyPrintStat,
  prettyPrintStatPlus,
} from "../Files/utilities";
import { useMediaQuery } from "@material-ui/core";
import CopyrightFooter from "../Components/CopyrightFooter/CopyrightFooter";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
}));

const Homepage = () => {
  const c = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const isDesktop = useMediaQuery("(min-width:960px)");
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));

  const [countryNames, setCountryNames] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableListData, setTableListData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapDisplayDataType, setMapDisplayDataType] = useState("cases");
  const [graphDataType, setGraphDataType] = useState("cases");

  const [mapCenter, setMapCenter] = useState({
    lat: "38.9637",
    lng: "35.2433",
  });

  const [mapZoom, setMapZoom] = useState(2.5);

  const [graphDuration, setGraphDuration] = useState(150);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);

        console.log("1", data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log("2", data);
          const countries = data.map((country) => ({
            name: country.country,
            code: country.countryInfo.iso2,
            flagSrc: country.countryInfo.flag,
          }));

          const sortedData = sortData(data);
          setTableListData(sortedData);
          setCountryNames(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const COUNTRY_CODE = e.target.value;
    console.log(COUNTRY_CODE);
    setSelectedCountry(COUNTRY_CODE);

    let API_URL =
      COUNTRY_CODE === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${COUNTRY_CODE}`;

    await fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        console.log("COUNTRY SWITCH FETCHED DATA", data);
        setMapZoom(5);
        if (data) {
          setMapCenter([data?.countryInfo.lat, data?.countryInfo.long]);
        }
      });
  };

  useEffect(() => {
    let GraphsDataSwitcher = () => {
      let CasesSwitch = document.getElementById("graphSwitcher__cases");

      CasesSwitch.addEventListener("click", () => {
        CasesSwitch.classList.add("activeButton");
        RecoveredSwitch.classList.remove("activeButton");
        DeathsSwitch.classList.remove("activeButton");
        setGraphDataType("cases");
      });

      let RecoveredSwitch = document.getElementById("graphSwitcher__recovered");

      RecoveredSwitch.addEventListener("click", () => {
        CasesSwitch.classList.remove("activeButton");
        RecoveredSwitch.classList.add("activeButton");
        DeathsSwitch.classList.remove("activeButton");
        setGraphDataType("recovered");
      });

      let DeathsSwitch = document.getElementById("graphSwitcher__deaths");

      DeathsSwitch.addEventListener("click", () => {
        CasesSwitch.classList.remove("activeButton");
        RecoveredSwitch.classList.remove("activeButton");
        DeathsSwitch.classList.add("activeButton");
        setGraphDataType("deaths");
      });
    };

    GraphsDataSwitcher();
  }, []);

  return (
    <div className="app flexColumn">
      <Container maxWidth="false" className={c.container}>
        <Grid container direction="column">
          <Grid item container className="appTop flexRow">
            <Grid
              item
              xs="12"
              md="9"
              container
              direction="column"
              className="app__left"
            >
              {/* Header Section */}

              <Grid
                item
                container
                className="app__header"
                justifyContent="space-between"
              >
                <Grid item>
                  <img
                    className="logo pointer"
                    src={TrackerLogo}
                    alt="COVID-19 TRACKER"
                    width={isDesktop ? 160 : 135}
                  />
                </Grid>

                <Grid item className="flexRow justify-end center">
                  {isTablet && <Grid xs />}
                  <Grid item>
                    <FormControl className="header__dropdown">
                      <Select
                        className="header__dropdownBox"
                        variant="outlined"
                        value={selectedCountry}
                        onChange={onCountryChange}
                      >
                        <MenuItem className="listItem" value="worldwide">
                          <img
                            className="dropdown__flagGlobal"
                            src={WorldwideIcon}
                          />
                          Worldwide
                        </MenuItem>
                        {countryNames.map(({ code, flagSrc, name }) => (
                          <MenuItem className="listItem" value={code}>
                            <img
                              className="dropdown__flag"
                              src={flagSrc}
                              alt={code}
                            />
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* App stats Section */}

              <Grid
                item
                container
                alignItems="center"
                justifyContent="center"
                spacing="1"
                className="app__stats"
                style={{ width: "100%" }}
              >
                <InfoBox
                  onClick={(e) => {
                    setMapDisplayDataType("cases");
                  }}
                  active={mapDisplayDataType === "cases"}
                  title="Cases"
                  plus={prettyPrintStatPlus(countryInfo.todayCases)}
                  total={NormalFiguresToCommas(countryInfo.cases)}
                />

                <InfoBox
                  onClick={(e) => {
                    setMapDisplayDataType("recovered");
                  }}
                  active={mapDisplayDataType === "recovered"}
                  title="Recovered"
                  plus={prettyPrintStatPlus(countryInfo.todayRecovered)}
                  total={NormalFiguresToCommas(countryInfo.recovered)}
                />

                <InfoBox
                  onClick={(e) => {
                    setMapDisplayDataType("deaths");
                  }}
                  active={mapDisplayDataType === "deaths"}
                  title="Deaths"
                  plus={prettyPrintStatPlus(countryInfo.todayDeaths)}
                  total={NormalFiguresToCommas(countryInfo.deaths)}
                />

                <InfoBox
                  title="Criticals"
                  plus={prettyPrintStat(countryInfo.critical)}
                  total={NormalFiguresToCommas(
                    countryInfo.criticalPerOneMillion
                  )}
                  hideTotal
                  hidePlus
                />
              </Grid>
              <Grid item>
                <Map
                  mapType={mapDisplayDataType}
                  center={mapCenter}
                  zoom={mapZoom}
                  countries={mapCountries}
                />
              </Grid>
            </Grid>
            {isDesktop && (
              <Grid item xs="3">
                <Card
                  className="app__right flexColumn"
                  style={{ overflow: "hidden" }}
                >
                  <div className="appRight__top">
                    <h3>Live Cases by Countries</h3>
                    <Table
                      listData={tableListData}
                      className="appRight__topTable"
                    />
                  </div>
                  <div className="appRight__bottom">
                    <LineGraph
                      graphDataDuration="25"
                      graphTagline="Worldwide New Cases"
                      setGraphType={mapDisplayDataType}
                      needTagline
                      mapTagline="Worldwide New Deaths"
                      specificGraphContainer="appRight__bottomGraph"
                    />
                  </div>
                </Card>
              </Grid>
            )}
          </Grid>
          <Grid item xs="12" container className="appBottom">
            <Grid item xs="12">
              <LineGraph
                needGraphSwitchingButtons
                setGraphType={graphDataType}
                graphDataDuration={graphDuration}
              />
            </Grid>
            {isTablet && (
              <Grid
                item
                container
                xs="12"
                style={{ margin: "1rem 1rem 3rem", width: "100%" }}
              >
                <Grid item xs="12" sm="5" style={{ maxWidth: "97%" }}>
                  <div className="totalCasesList__tableContainer">
                    <h3>Live Cases by countries</h3>
                    <Table
                      listData={tableListData}
                      className="totalCasesList__table"
                    />
                  </div>
                </Grid>
                <Grid item xs="12" sm="7">
                  <LineGraph
                    needTagline
                    mapTagline="Total Cases"
                    graphDataDuration={50}
                    sideBarGraph
                    setGraphType="cases"
                  />
                  <LineGraph
                    needTagline
                    mapTagline="Total Deaths"
                    graphDataDuration={50}
                    sideBarGraph
                    setGraphType="deaths"
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>

      <CopyrightFooter />
    </div>
  );
};

export default Homepage;
