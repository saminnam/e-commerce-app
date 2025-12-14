import axios from "axios";
import { useState } from "react";

export default function Coupon() {
  const [coupon, setCoupon] = useState("");

  const verify = async () => {
    await axios.post(
      "http://localhost:5000/api/reseller/verify-coupon",
      { couponCode: coupon },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    alert("Coupon verified");
  };

  return (
    <>
      <input onChange={e => setCoupon(e.target.value)} />
      <button onClick={verify}>Verify Coupon</button>
    </>
  );
}
