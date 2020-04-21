import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { colors } from "../../constant/";

const LoadingStyle = styled.span`
    transition: 0.75s;
    display: block;
    position: absolute;
    height: 2px;
    width: ${(props) => props.loading}%;
    left: 0px;
    background ${colors.supportColorMain};
    bottom: 0px;
`;

const NavLoading = () => {
    const loading = useSelector((state) => state.entities.loading.percentage);

    return !loading || loading === 100 ? null : <LoadingStyle loading={loading}></LoadingStyle>;
};

export default NavLoading;
