import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function Profile() {
  const { user } = useContext(StoreContext);

  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      {user.role === "reseller" && (
        <p>Coupon: {user.resellerCoupon}</p>
      )}
    </>
  );
}
