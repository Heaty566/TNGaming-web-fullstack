import React from "react";

const FooterLink = ({ label, linkURL }) => {
    return (
        <a href={linkURL} target="_blank" rel="noopener noreferrer">
            {label}
        </a>
    );
};

export default FooterLink;
