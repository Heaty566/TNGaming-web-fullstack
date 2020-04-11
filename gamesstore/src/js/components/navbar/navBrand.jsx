import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { styles } from "../../constant/";
const { maxHeightWidth, noDecorateAndList } = styles;

const Container = styled.div`
    a {
        /* ${noDecorateAndList} */
    }
`;

const Image = styled.img`
    /* ${maxHeightWidth} */
    object-fit: cover;
`;

const NavBrand = ({ iconURL, URL }) => {
    return (
        <div className="logo">
            <Link to={URL}>
                <Image src={process.env.PUBLIC_URL + iconURL} alt="logo" />
            </Link>
        </div>
    );
};

export default NavBrand;
