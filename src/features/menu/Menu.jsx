import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router";
import MenuItem from "./MenuItem";
function Menu() {
  const menu = useLoaderData();
  // console.log(menu);

  return (
  <ul className="divide-y divide-stone-300">
    {menu.map((pizza) => <MenuItem pizza={pizza} key={pizza.id}/>)}
  </ul>
  );
}

export async function loader() {
  const menu = getMenu();
  return menu;
}
export default Menu;
