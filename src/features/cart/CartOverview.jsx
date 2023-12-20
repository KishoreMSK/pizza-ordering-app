import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)
  if(!totalCartQuantity) return null
  return (
    <div className="bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base flex items-center justify-between">
      <p className="space-x-6 font-semibold text-stone-300 sm:first-letter:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{totalCartPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
