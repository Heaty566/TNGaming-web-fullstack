import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { gameService } from "../services/";
import { useIsMountedRef } from "../utils/hooks/useIsMountedRef";
import { icons } from "../constant";

function GameProduct() {
  const match = useRouteMatch();
  const isMounted = useIsMountedRef();
  const [game, setGame] = useState({});
  const [error, setError] = useState("");
  const [jumbotron, setJumbotron] = useState(0);
  useEffect(() => {
    const jumbotronInterval = setInterval(() => {
      setJumbotron(jumbotron + 1);
    }, 5000);

    if (Object.keys(game).length && jumbotron > game.images.length - 2)
      setJumbotron(0);
    if (Object.keys(game).length && jumbotron < 0)
      setJumbotron(game.images.length - 2);

    return () => clearInterval(jumbotronInterval);
  }, [game, jumbotron]);

  useEffect(() => {
    gameService
      .getGame(match.params.gameId)
      .then(({ data }) => {
        if (isMounted.current) setGame(data.data);
      })
      .catch(({ response }) => setError(response.data.msg));
  }, [isMounted, match.params]);

  return (
    <div className="gameProduct">
      <div className="gameProduct__jumbotron">
        <span
          className="jumbotron__indicator jumbotron__indicator-right"
          onClick={() => setJumbotron(jumbotron - 1)}
        >
          <img
            src={process.env.PUBLIC_URL + icons.arrowIndicator}
            alt="indicator-right"
          />
        </span>
        <div className="jumbotron__image">
          {game.images &&
            game.images
              .slice(1, game.images.length)
              .map((item, index) => (
                <img
                  className={index === jumbotron ? "image-active" : ""}
                  key={item}
                  src={process.env.PUBLIC_URL + item}
                  alt="game"
                />
              ))}
        </div>
        <span
          className="jumbotron__indicator jumbotron__indicator-left"
          onClick={() => setJumbotron(jumbotron + 1)}
        >
          <img
            src={process.env.PUBLIC_URL + icons.arrowIndicator}
            alt="indicator-left"
          />
        </span>
      </div>

      <div className="gameProduct__content">
        <div className="content__title">
          <h2>{game.name}</h2>
          <button className="content__btn">{game.price}</button>
        </div>
        <h3 className="content__title-2">About game</h3>

        <div className="content__main">
          <div className="content__section">
            <h3 className="content__subtitle">Publisher</h3>
            <p>{game.publisher}</p>
          </div>
          <div className="content__section">
            <h3 className="content__subtitle">Developer</h3>

            <p>{game.publisher}</p>
          </div>
          <div className="content__section">
            <h3 className="content__subtitle">date</h3>
            <p>{game.date}</p>
          </div>
        </div>
        <div className="content__support">
          <div className="content__section">
            <h3 className="content__subtitle">Tags</h3>
            <div className="content__array">
              {game.tags &&
                game.tags.map((item) => <p key={item._id}>{item.name}</p>)}
            </div>
          </div>
          <div className="content__section">
            <h3 className="content__subtitle">Rating</h3>
            <p>4.75/5</p>
          </div>
          <div className="content__section">
            <h3 className="content__subtitle">Platform</h3>
            <div className="content__array">
              {game.platforms &&
                game.platforms.map((item) => <p key={item._id}>{item.name}</p>)}
            </div>
          </div>
        </div>
        <div className="content__footer">
          <div className="content__section">
            <h3 className="content__subtitle">Description</h3>
            <p className="content__description">{game.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameProduct;
