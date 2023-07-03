import React from "react";
import "./Slide.scss";
import logo from "../image/one-piece.jpg";
import logo1 from "../image/img_slide.jpg";
import { Carousel } from "antd";

const Slide = () => {
  return (
    <Carousel autoplay>
      <div>
        <img className="slide_img" src={logo} alt="" />
      </div>
      <div>
        <img className="slide_img" src={logo1} alt="" />
      </div>
      <div>
        <img className="slide_img" src={logo} alt="" />
      </div>
      <div>
        <img className="slide_img" src={logo1} alt="" />
      </div>
    </Carousel>
  );
};

export default Slide;
