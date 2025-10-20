import React from "react";
import Hero from "../components/Hero";
import ExploreCategory from "../components/ExploreCategory";
// import ProductDisplay from "../components/ProductDisplay";

const Home = ({ category, setCategory, showMenuList, setShowMenuList }) => {
  return (
    <div>
      {/* <Hero /> */}
      <Hero />
      <ExploreCategory />
      {/* <ProductDisplay category={category} /> */}
    </div>
  );
};

export default Home;
