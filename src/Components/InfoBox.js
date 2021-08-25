import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";

const InfoBox = ({ title, plus, total, hideTotal, active, ...props }) => {
  return (
    <Grid item xs="12" sm="6" md="4" lg="3">
      <Card
        onClick={props.onClick}
        className={`infoCard pointer ${active && "activeInfo__box"}`}
      >
        <CardContent>
          <h1 className="infoCard__title">{title}</h1>
          <h2 className="infoCard__plus">{plus}</h2>
          <h3 className="infoCard__total">
            {total} {hideTotal ? "/Million" : "Total"}
          </h3>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default InfoBox;
