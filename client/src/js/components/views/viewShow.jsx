import React, { useEffect, useState } from "react";
import _ from "lodash";

import { useIsMountedRef } from "../../utils/hooks/useIsMountedRef";
import { gameService } from "../../services";
import { colors } from "../../constant";
import { store } from "../../config/linkURL.json";
import ProductCard from "./common/viewCard";
import Wave from "../utils/loading/wave";

const ViewShow = () => {
  const [games, setGames] = useState();
  const isMounted = useIsMountedRef();
  useEffect(() => {
    gameService.getGames(1).then(({ data }) => {
      if (isMounted.current) setGames(data.data);
    });
  }, [isMounted]);
  const sliceShowOne = _(games).slice(0, 5).take(5).value();
  const sliceShowTwo = _(games).slice(3, 8).take(5).value();
  return (
    <div className="view__main">
      <h2 className="view__title">Trending</h2>
      <div className="view__show">
        {sliceShowOne.length ? (
          sliceShowOne.map((item) => (
            <ProductCard
              key={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
              publisher={item.publisher}
              linkURL={store.gameURL + "/" + item._id}
            />
          ))
        ) : (
          <Wave height="24px" width="12px" color={colors.primaryColorLighter} />
        )}
      </div>
      <h2 className="view__title">Hot Sale</h2>
      <div className="view__show">
        {sliceShowTwo.length ? (
          sliceShowTwo.map((item) => (
            <ProductCard
              key={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
              linkURL={store.gameURL + "/" + item._id}
              publisher={item.publisher}
            />
          ))
        ) : (
          <Wave height="24px" width="12px" color={colors.primaryColorLighter} />
        )}
      </div>
    </div>
  );
};
export default ViewShow;
