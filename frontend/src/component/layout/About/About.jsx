import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram"
import Photo from "../../../images/pfff.jpg"
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/sheikh_zulkifal";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={Photo}
              alt="Founder"
            />
            <Typography>Sheikh Zulkifal</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample website made by @zulkifal. Only with the
              purpose to learn MERN Stack.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://x.com/sheikh_zulkifal?s=08"
              target="blank"
            >
              <TwitterIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/sheikh_zulkifal" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
