import React from "react";
import GlobalHero from "../../components/GlobalHero";
import BecomeSellerForm from "./BecomeSellerForm";

const BecomeaSeller = () => {
  return (
    <section>
      <GlobalHero title={"📩 Become A Seller"} />
      <BecomeSellerForm />
    </section>
  );
};

export default BecomeaSeller;
