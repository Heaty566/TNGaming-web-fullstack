import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { navbar } from "../../../config/linkURL.json";
import { store } from "../../../stores/configStore";
import { onChangeSearchBox } from "../../../stores/searchBox";
import { icons } from "../../../constant/";

function NavSearchbox() {
    const history = useHistory();
    const searchBox = useSelector((state) => state.entities.searchBox);

    const [active, setActive] = useState(false);
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState(-1);
    const [value] = useDebounce(search, 500);

    const handleOnKeyDown = useCallback(
        (keyCode) => {
            switch (keyCode) {
                case 13: {
                    if (select !== -1)
                        return history.push(navbar.searchPushToGame + "/" + searchBox.results[select]._id);

                    history.push(navbar.searchBoxURL + "/" + value);
                    break;
                }

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
        [select, searchBox, history, value]
    );

    useEffect(() => {
        if (value) store.dispatch({ type: onChangeSearchBox.type, payload: value });
    }, [value]);

    return (
        <div className="searchbox">
            <div className="searchbox__input">
                <input
                    type="text"
                    value={search}
                    onChange={({ currentTarget: input }) => setSearch(input.value)}
                    onFocus={() => setActive(true)}
                    onBlur={() => (select === -1 ? setActive(false) : null)}
                    onKeyDown={({ keyCode }) => handleOnKeyDown(keyCode)}
                    placeholder="Search"
                    autoComplete="off"
                />
                <img id="search" src={process.env.PUBLIC_URL + icons.search} alt="search icon" />
            </div>
            {searchBox.results.length && active ? (
                <ul className="searchbox__result">
                    {searchBox.results.map((option, index) => {
                        return (
                            <li
                                key={option._id}
                                onMouseLeave={() => setSelect(-1)}
                                onMouseEnter={() => setSelect(index)}
                                onClick={() => setActive(false)}
                            >
                                <Link
                                    to={navbar.searchPushToGame + "/" + option._id}
                                    className={index === select ? "column-active" : ""}
                                >
                                    <p>{option.name}</p>
                                    <p>$ {option.price}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
}

export default NavSearchbox;
