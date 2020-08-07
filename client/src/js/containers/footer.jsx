import React from "react";

import FooterLink from "../components/footer/footerLink";
import FooterText from "../components/footer/footerText";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__col">
        <h4>Contact</h4>
        <FooterLink
          label="Facebook"
          linkURL="https://www.facebook.com/Heaty566"
        />
        <FooterLink label="Github" linkURL="https://github.com/Heaty566" />
      </div>
      <div className="footer__col">
        <h4>Member</h4>
        <FooterText content="Simon Pham" />
      </div>
      <div className="footer__col">
        <h4>Information</h4>
        <FooterText content="Version 0.9.2 beta" />
        <FooterText content="April 20 2020" />
      </div>
    </div>
  );
};

export default Footer;
