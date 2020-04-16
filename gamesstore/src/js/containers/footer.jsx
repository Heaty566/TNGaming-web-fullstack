import React from "react";

import FooterLink from "../components/footer/footerLink";
import FooterText from "../components/footer/footerText";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__wrapper-right">
                <h3>Contact</h3>
                <FooterLink label="Facebook" linkURL="https://www.facebook.com/Heaty566" />
                <FooterLink label="Github" linkURL="https://github.com/Heaty566" />
            </div>
            <div className="footer__wrapper-left">
                <h3>Version</h3>
                <FooterText content=" 0.9.1 beta" />
            </div>
        </div>
    );
};

export default Footer;
