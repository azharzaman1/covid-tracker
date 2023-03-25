import React from "react";
import { Grid, makeStyles, Chip } from "@material-ui/core";
import { GitHub, Twitter, Language, LinkedIn } from "@material-ui/icons";

import "./CopyrightFooter.css";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  footerSection: {
    marginTop: "8rem",
    padding: "1rem",
  },

  chip: {
    margin: "0 5px",
    padding: "0 5px",
  },
}));

const CopyrightFooter = () => {
  const [azProfile, setAzProfile] = useState(true);
  const c = useStyles();

  useEffect(() => {
    if (window !== "undefined") {
      setAzProfile(
        window.location.hostname === "covidtracker.azharzaman.com"
          ? true
          : false
      );
    }
  }, []);

  return (
    <div
      className={`footerSection ${c.footerSection}`}
      data-aos="fade-up"
      data-aos-delay="1000"
    >
      <Grid container direction="column" alignItems="center">
      {/*
        <Grid item>
          <Heading2 className="footerSection__heading">
            Design and developed by {azProfile ? "Azhar Zaman" : "Kamran Ashraf"}
          </Heading2>
        </Grid>
        */}
        <Grid item container justifyContent="center">
          <MuiChip
            link={
              azProfile
                ? "https://azharzaman.com"
                : "https://kamranashraf.vercel.app"
            }
            title="Website"
            icon={<Language fontSize="small" />}
          />
          <MuiChip
            link={
              azProfile
                ? "https://github.com/azharzaman1"
                : "https://github.com/codeByKamran"
            }
            title="Github"
            icon={<GitHub fontSize="small" />}
          />
          {azProfile && (
            <>
              <MuiChip
                link="https://www.linkedin.com/in/azhar-zaman"
                title="LinkedIn"
                icon={<LinkedIn fontSize="small" />}
              />
              <MuiChip
                link="https://twitter.com/idrazhar"
                title="Twitter"
                icon={<Twitter fontSize="small" />}
              />
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export const Heading2 = ({ children, className }) => {
  return <h4 className={`MuiHeading2 ${className}`}>{children}</h4>;
};

export const MuiChip = ({
  title,
  icon,
  size,
  unclickable,
  color,
  variant,
  link,
}) => {
  const c = useStyles();
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Chip
        label={title}
        icon={icon}
        size={size ? size : "medium"}
        clickable={unclickable ? false : true}
        color={color ? color : "secondary"}
        variant={variant ? variant : "outlined"}
        className={`${c.chip}`}
      />
    </a>
  );
};

export default CopyrightFooter;
