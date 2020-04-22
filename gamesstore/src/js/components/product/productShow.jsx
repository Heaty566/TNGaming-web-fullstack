import React, { useEffect, useState } from "react";
import ProductCard from "./common/productCard";
import { gameService } from "../../services/";
const ProductShow = () => {
  const [games, setGames] = useState();

  useEffect(() => {
      gameService.getGames(() => {
        con
      });
  }, [games]);
  return (
    <div>
      <ProductCard />
    </div>
  );
};

export default ProductShow;
