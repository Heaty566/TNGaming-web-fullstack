import React from "react";
import styled from "styled-components";

import { icons } from "../constant/";
import NavBrand from "../components/navbar/navBrand";
import NavSearch from "../components/navbar/navSearch";

const Container = styled.div`
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18vw;
`;

function Navbar() {
    return (
        <Container>
            <NavBrand iconURL={icons.logo} URL="/home" />
            <NavSearch />
            <p>group btn</p>
        </Container>
    );
}

export default Navbar;
