import React from "react";
import { Container } from "react-bootstrap";
const Footer = () => {
  return (
    <Container>
      {" "}
      <div id="footer">
        <p class="lf">
          Copyright &copy; 2010 <a href="/#">SiteName</a> - All Rights Reserved
        </p>
        <p class="rf">
          Design by <a href="http://chocotemplates.com/">ChocoTemplates.com</a>
        </p>
        <div style={{ clear: "both" }}></div>
      </div>
    </Container>
  );
};

export default Footer;
