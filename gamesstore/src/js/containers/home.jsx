import React from "react";
import { Link } from "react-router-dom";

import { introduction } from "../config/linkURL.json";

const Home = () => {
    return (
        <div className="introduction">
            <div className="introduction__banner">
                <div className="banner__image">
                    <img src="/pages/images/introduction.jpg" alt="introduction" />
                </div>
                <div className="banner__content">
                    <div className="content__title">
                        <h1>TNGaming Store</h1>
                        <h4>AN OPEN SOURCE MERN PROJECT</h4>
                    </div>
                    <p>
                        This is a project that will work such as Steam or EpicStore in a smaller scale. We are
                        using NodeJS and Express for back-end, React for front-end and MongoDB will be the
                        main Database but we’re going to develop with others technique as GraphQL, Typescript
                        in the future. We hope you will learn and enjoy with this project.
                    </p>
                    <Link className="content__link" to={introduction.bannerURL}>
                        Explore
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
