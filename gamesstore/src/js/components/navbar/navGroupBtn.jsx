import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors, icons, styles } from "../../constant/";

const Container = styled.div`
  height: 24px;
  display: flex;

  a {
    color: white;
    display: flex;
  }

  img {
        path: {

              fill: #fefefe;
        }
    height: 100%;
    width: 100%;
  }
`;

function NavGroupBtn() {
  return (
    <Container>
      <Link to="#">
        <p>Sign In</p>
        <img src={process.env.PUBLIC_URL + icons.login} alt="login" />
      </Link>
    </Container>
  );
}

export default NavGroupBtn;
