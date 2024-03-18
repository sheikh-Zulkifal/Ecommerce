import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram"
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
              src="https://asset.cloudinary.com/dtw46ssil/3b8817a275d27e91089bdd79ca01d026"
              alt="Founder"
            />
            <Typography>Sheikh Zulkifal</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @zulkifal. Only with the
              purpose to learn MERN Stack
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">X</Typography>
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
