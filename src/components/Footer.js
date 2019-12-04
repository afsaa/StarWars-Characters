import React from "react";
import Emoji from "./Emoji";

import "./style/Footer.css";

const Footer = () => (
  <div className="Footer">
    <h4>
      Created with <Emoji symbol="💙" /> and <Emoji symbol="🔥" /> by me: <br />
      Andrés Fernando Saa
    </h4>
  </div>
);

export default Footer;
