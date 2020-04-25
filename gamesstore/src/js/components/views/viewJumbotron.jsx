import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { icons } from "../../constant";
import { store } from "../../config/linkURL.json";

const ViewJumbotron = () => {
  const { jumbotron } = store;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current + 1);

      if (current + 2 > store.jumbotron.length) setCurrent(0);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="product__jumbotron">
      {jumbotron.map((item, index) => (
        <div
          key={item.contentTitle}
          className={
            index === current
              ? "jumbotron__slice jumbotron__active"
              : "jumbotron__slice"
          }
        >
          <div className="jumbotron__img">
            <img src={process.env.PUBLIC_URL + item.imageURL} alt="jumbotron" />
            <div className="jumbotron__indicator">
              {jumbotron.map((item, index) => (
                <span
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={index === current ? "active" : ""}
                ></span>
              ))}
            </div>
          </div>
          <div className="jumbotron__content">
            <p className="content__subtitle">{item.contentSubtitle}</p>
            <h2 className="content__title">{item.contentTitle}</h2>
            <p className="content__main">{item.contentMain}</p>

            <Link className="content__link" to={item.contentURL}>
              <p>{item.contentLink}</p>
              <img
                src={process.env.PUBLIC_URL + icons.lineArrow}
                alt={item.contentLink}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewJumbotron;
