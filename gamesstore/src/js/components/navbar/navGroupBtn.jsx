import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";

import config from "../../../config/linkURL.json";
import { colors, icons, styles, animations } from "../../constant/";
const {
    flexBetween,
    noDecorateAndList,
    noBorderAndOutline,
    maxHeightWidth,
} = styles;

const Container = styled.div`
    a {
        color: ${colors.fontColor[0]};
        ${noDecorateAndList}
        ${flexBetween}
    p {
            font-size: 14px;
            letter-spacing: 1px;
            font-weight: bold;
            margin-right: 5px;
        }
    }
`;

const UserContainer = styled.div`
  height: 24px;
  position: relative;

  ${flexBetween}
  color: ${colors.fontColor[0]};
  cursor: pointer;
  & > * {
    margin: 0 2.5px;
  }

  .active {
    animation: ${animations.sliceDown} 0.6s forwards;
  }

  .user,
  .balance {
    font-size: 14px;
  }

  .balance {
    opacity: 0.7;
  }

  .dropdown-btn {
    height: 100%;
    display: block;
    background: none;

    ${noBorderAndOutline};
  }

  img {
    max-height: 24px;
    max-width: 24px;
   
   ${maxHeightWidth}
  }

  .balance {
    &::before {
      content: "$ ";
    }
  }
`;

const DropdownMenu = styled.ul`
    position: absolute;
    padding: 10px 0;
    opacity: 0;
    width: 100%;
    top: 42px;
    border-radius: 0 0 2px 2px;

    animation: ${animations.sliceUp} 0.6s;
    background-color: ${colors.divBackground[3]};

    a,
    button {
        text-indent: 5px;
        transition: 0.2s ease-in-out;
        color: white;
        padding: 7px 5px;
        font-size: 14px;
        cursor: pointer;
    }

    a,
    li,
    button {
        text-align: left;
        display: block;

        ${noDecorateAndList}
    }

    button {
        width: 100%;
        background: none;

        ${noBorderAndOutline}
    }

    li:hover a,
    li:hover button {
        transform: scale(1.05);

        color: ${colors.color[6]};
    }
`;

function NavGroupBtn() {
    const [active, setActive] = useState("off");
    const cookies = new Cookies();

    const handleLogout = () => {
        cookies.remove("x-auth-token");
        window.location.reload();
    };

    const auth = useSelector((state) => state.auth);
    return auth.token ? (
        <UserContainer
            onClick={() => setActive(active === "on" ? "off" : "on")}
        >
            <img
                src={process.env.PUBLIC_URL + auth.user.avatar}
                alt={auth.name}
            />
            <p className="user">{auth.user.name}</p>

            <button className="dropdown-btn">
                <img src={process.env.PUBLIC_URL + icons.dropdownArrow} />
            </button>

            <DropdownMenu
                className={
                    active === "on" ? "dropdown-menu active" : "dropdown-menu"
                }
            >
                <li>
                    <Link to={config.navbar.groupBtn.profileURL}>Profile</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
                {auth.user.isAdmin && (
                    <li>
                        <Link to={config.navbar.groupBtn.adminDashboard}>
                            Admin Dashboard
                        </Link>
                    </li>
                )}
                {auth.user.developer && (
                    <li>
                        <Link to={config.navbar.groupBtn.developerDashboard}>
                            Developer Dashboard
                        </Link>
                    </li>
                )}
            </DropdownMenu>

            <p className="balance">{auth.user.balance}</p>
        </UserContainer>
    ) : (
        <Container>
            <Link to={config.navbar.signInURL}>
                <p>Sign In</p>
                <img src={process.env.PUBLIC_URL + icons.login} alt="login" />
            </Link>
        </Container>
    );
}

export default NavGroupBtn;
