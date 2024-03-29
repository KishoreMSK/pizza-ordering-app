import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from '../cart/EmptyCart'
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from '../../store'
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const navigation = useNavigation();
  const dispatch  = useDispatch();
  const isSubmitting = navigation.state === 'submitting'
  const {username, status, position, address, error: errorAddress} = useSelector((state) => state.user)
  const isLoadingAddress = status === 'loading';
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="mt-2 text-xs rounded-md bg-red-100 p-2 text-red-700">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
            className="input w-full"
            type="text" name="address"
            disabled={isLoadingAddress}
            defaultValue={address}
            required />
            {status === 'error' && 
            <p className="mt-2 text-xs rounded-md bg-red-100 p-2 text-red-700">
              {errorAddress}
            </p>}

          </div>
          {!position.latitude && !position.longitude && <span className="absolute right-[5px] top-[3px]
            z-50 md:right-[5px] md:top-[5px]">
          <Button type='small' disabled={isLoadingAddress}
            onClick={(e)=> {
            e.preventDefault();
            dispatch(fetchAddress())
            }}>
              Get location
            </Button>
          </span>}

        </div>

        <div className="mb-10 flex items-center gap-3">
          <input
            className="h-6 w-6 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        {/*Since we cannot access the state in action function
           to add some other data in formData we use hidden input types*/}
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
          <input type="hidden" name="position" 
           value={position.latitude && position.latitude ? `${position.latitude} ${position.longitude}` : ''}></input>
          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>{isSubmitting ? 'Placing order' : `Order now from ${totalPrice}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){
    const formData = await request.formData()
    // console.log(formData.get('customer'));
    const data = Object.fromEntries(formData) //will convert to type object 
    const order = {
      ...data,
      cart: JSON.parse(data.cart),
      priority: data.priority === 'true'
    }
    // console.log(order);
    const errors = {};
    if(!isValidPhone(order.phone)){
      errors.phone = "Please provide valid mobile number.We might need it to contact you";
    }
    if(Object.keys(errors).length > 0) return errors;

    const newOrder = await createOrder(order);
    //since we cannot use dispatch hook in regualar function. we can directly import the store and dispatch the action
    store.dispatch(clearCart());
    return redirect(`/order/${newOrder.id}`)
  }

export default CreateOrder;
