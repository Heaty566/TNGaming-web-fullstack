import React, { useEffect, useState } from "react";
import _ from "lodash";

import { useIsMountedRef } from "../../utils/hooks/useIsMountedRef";
import { gameService } from "../../services";
import { colors } from "../../constant";
import ProductCard from "./common/viewCard";
import Loading from "../utils/loading/wave";

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
    <div className="product__main">
      <h2 className="product__title">Trending</h2>
      <div className="product__show">
        {sliceShowOne.length ? (
          sliceShowOne.map((item) => (
            <ProductCard
              key={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
              publisher={item.publisher}
            />
          ))
        ) : (
          <Loading
            height="24px"
            width="12px"
            color={colors.primaryColorLighter}
          />
        )}
      </div>
      <h2 className="product__title">Hot Sale</h2>
      <div className="product__show">
        {sliceShowTwo.length ? (
          sliceShowTwo.map((item) => (
            <ProductCard
              key={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
              publisher={item.publisher}
            />
          ))
        ) : (
          <Loading
            height="24px"
            width="12px"
            color={colors.primaryColorLighter}
          />
        )}
      </div>
    </div>
  );
};
export default ViewShow;
