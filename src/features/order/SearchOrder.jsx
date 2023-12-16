import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchOrder() {
  const [orderNo, setOrderNo] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    if(!orderNo) return
    navigate(`/order/${orderNo}`)
    setOrderNo('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order no."
        value={orderNo}
        onChange={(e) => setOrderNo(e.target.value)}
      />
    </form>
  );
}
