import { useFetcher, useParams } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

export function UpdateOrder({order}){
    const fetcher = useFetcher();
    // const { orderId } = useParams();
    return(
        <fetcher.Form method="PATCH" className="text-right">
            <Button type='primary'>Make priority</Button>
            {/* <input type="hidden" name="id" value={orderId}></input> */}
        </fetcher.Form>
    )
}

export async function action({request, params}){
    // const formData = await request.formData()
    // const {id} = Object.fromEntries(formData)
    // console.log(id);
    const data = {priority : true}
    await updateOrder(params.orderId, data);
    return null;
}