import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { styles, colors } from "../../constant/";
const { noDecorateAndList } = styles;

const ContainerLink = styled.div`
  a {
    color: ${colors.fontColor[0]};
    border-bottom: 1px solid ${colors.fontColor[0]};
    ${noDecorateAndList}
  }
`;

const FormLink = ({ label, URL }) => {
  return (
    <ContainerLink>
      <Link to={URL}>{label}</Link>
    </ContainerLink>
  );
};

export default FormLink;
