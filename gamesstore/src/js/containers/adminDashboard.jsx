import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { icons } from "../constant/";

const Controller = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    padding: 20px 10px;
    background-color: #1b2838;
    color: white;
    h1 {
        font-size: 24px;
    }

    .controller-column {
        margin: 10px;
        /* border: 1px solid red; */
        button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 16px;
            background: none;
            border: none;
            outline: none;
            p {
                margin-right: 5px;
            }

            img {
                transform: rotate(90deg);
            }
        }

        ul {
            margin: 10px;

            li,
            a {
                display: block;
                color: white;
                text-decoration: none;
                list-style: none;
            }
        }
    }
`;
const Panel = styled.div`
    border: 1px solid blue;
    grid-column-start: 2;
    grid-column-end: 4;
`;

function AdminDashboard() {
    return (
        <React.Fragment>
            <Controller>
                <h1>Admin Dashboard</h1>
                <div className="controller-column">
                    <button>
                        <p>Admin</p>
                        <img
                            src={
                                process.env.PUBLIC_URL + icons.dropdownTriangles
                            }
                        />
                    </button>
                    <ul>
                        <li>
                            <Link>Clean Token</Link>
                        </li>
                        <li>
                            <Link>Promote Developer</Link>
                        </li>
                    </ul>
                </div>
            </Controller>
            <Panel>
                <h1>Panel</h1>
            </Panel>
        </React.Fragment>
    );
}

export default AdminDashboard;
