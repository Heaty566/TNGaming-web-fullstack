import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import styled from "styled-components";

import Spinner from "../loading/spinner";
import { store } from "../../stores/configStore";
import { onChangeSearchBox } from "../../stores/searchBox";
import { icons } from "../../constant/";

const SearchContainer = styled.div`
    background: #ffffff;
    padding: 2px 0;
    width: 36.6vw;
    position: relative;
    border-radius: 2px;
    height: 24px;
`;

const SearchInput = styled.div`
    padding: 0 15px;
    height: inherit;
    display: grid;
    align-items: center;
    grid-template-columns: 14px auto;

    img {
        transition: 0.2s;
        opacity: 0.6;
    }

    input {
        transition: 0.2s;
        margin-left: 5px;
        font-size: 12px;
        border: none;
        outline: none;
        &::placeholder {
            opacity: 0.6;
        }
    }

    &:focus-within {
        img {
            transform: scale(1.1);
            opacity: 1;
        }
        input {
            font-weight: 500;
            font-size: 14px;
            &::placeholder {
                opacity: 1;
            }
        }
    }
`;

const ResultColums = styled.li`
    &.active {
        border-left: 10px solid #171a21;
        a {
            font-weight: 600;
        }
    }
`;

const SearchResult = styled.div`
    border-radius: 0 0 2px 2px;
    width: 100%;
    position: absolute;
    background-color: white;
    font-size: 14px;
    ${ResultColums},
    a {
        transition: 100ms;
        color: black;
        text-decoration: none;
        list-style: none;
        display: block;
    }

    a {
        padding: 5px 10px;
    }
`;

function SearchNav() {
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState(-1);
    const [active, setActive] = useState(false);
    const [value] = useDebounce(search, 1000);
    const searchBox = useSelector((state) => state.entities.searchBox);

    const handleOnKeyDown = useCallback(
        (keyCode) => {
            switch (keyCode) {
                case 38:
                    setSelect(select - 1);
                    if (select <= 0) setSelect(searchBox.results.length - 1);
                    break;

                case 40:
                    setSelect(select + 1);
                    if (select >= searchBox.results.length - 1) setSelect(0);
                    break;
                default:
                    setSelect(-1);
            }
        },
        [select, searchBox]
    );
    useEffect(() => {
        if (value) store.dispatch({ type: onChangeSearchBox.type, payload: value });
    }, [value]);

    return (
        <SearchContainer>
            <SearchInput>
                <img src={process.env.PUBLIC_URL + icons.search} alt="search" />
                <input
                    type="search"
                    placeholder="Search"
                    autoComplete="off"
                    spellCheck="off"
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    onKeyDown={({ keyCode }) => handleOnKeyDown(keyCode)}
                    value={search}
                    onChange={({ currentTarget: input }) => setSearch(input.value)}
                />
            </SearchInput>
            {active && (
                <SearchResult>
                    {searchBox.results.length
                        ? searchBox.results.map((option, index) => (
                              <ResultColums
                                  key={option._id}
                                  className={index === select ? "active" : ""}
                                  onMouseEnter={() => setSelect(index)}
                                  onMouseLeave={() => setSelect(-1)}
                              >
                                  <Link to="#">{option.name}</Link>
                              </ResultColums>
                          ))
                        : searchBox.loading && <Spinner height="14px" border="5px" />}
                </SearchResult>
            )}
        </SearchContainer>
    );
}

export default SearchNav;
