import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchOrder() {
  const [orderNo, setOrderNo] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!orderNo) return
    navigate(`/order/${orderNo}`)
    setOrderNo('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus: ring focus: ring-yellow-500 sm:w-64 sm:focus:w-72"
        type="text"
        placeholder="Search order no."
        value={orderNo}
        onChange={(e) => setOrderNo(e.target.value)}
      />
    </form>
  );
}
