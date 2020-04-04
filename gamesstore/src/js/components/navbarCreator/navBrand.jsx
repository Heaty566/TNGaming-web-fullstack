import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import {co} from"../../../constant/colors"

const Container = styled.div`
    a {
        text-decoration: none;
    }
`;

const NavBrand = ({ iconURL, URL }) => {
    return (
        <Container>
            <Link to={URL}>
                <img src={process.env.PUBLIC_URL + iconURL} alt="logo" />
            </Link>
        </Container>
    );
};

export default NavBrand;
