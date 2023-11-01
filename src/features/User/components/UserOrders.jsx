import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../Auth/authSlice";
import { fetchLoggedInUserOrderAsync, selectUserOrders } from "../userSlice";
import { discountedPrice } from "../../../app/constants";

export default function UserOrders() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const orders = useSelector(selectUserOrders);


    useEffect(() => {
        dispatch(fetchLoggedInUserOrderAsync(user.id))
    }, [])

    return (
        <div>
            {orders.map((order) => [
                <div>
                    <h1 className='font-bold text-2xl border-b-4 border-[#1f2937]'>My Orders</h1>
                    <div className="bg-white mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="pt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                Order #{order.id}
                            </h1>
                            <h3 className="text-xl font-mono leading-7 text-amber-800 sm:truncate sm:text-3xl sm:tracking-tight">
                                Order Status: {order.status}
                            </h3>
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200 py-4">
                                    {order.items.map((item) => (
                                        <li key={item.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={item.href}>{item.title}</a>
                                                        </h3>
                                                        <p className="ml-4">${discountedPrice(item)}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <label htmlFor="quantity" className="text-black font-semibold">Qty:{item.quantity}
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>


                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base mb-2 font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${order.totalAmount}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total Items in Cart</p>
                                <p>{order.totalItems}</p>
                            </div>
                            <p className="mt-0.5 text-lg text-gray-500">Shipping address:</p>
                            <div
                                className=" flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                            >
                                <div className="flex gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            {order.selectedAddress.name}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            {order.selectedAddress.street}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            {order.selectedAddress.pinCode}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">
                                        Phone: {order.selectedAddress.phone}
                                    </p>
                                    <p className="text-sm leading-6 text-gray-500">
                                        {order.selectedAddress.city}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ])}
        </div>
    );
}
