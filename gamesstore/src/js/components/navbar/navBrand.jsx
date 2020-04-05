import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import {co} from"../../../constant/colors"

const Container = styled.div`
    a {
        text-decoration: none;
    }
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

const NavBrand = ({ iconURL, URL }) => {
    return (
        <Container>
            <Link to={URL}>
                <Image src={process.env.PUBLIC_URL + iconURL} alt="logo" />
            </Link>
        </Container>
    );
};

export default NavBrand;
