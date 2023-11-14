import React, { useState } from 'react'
import Cart from '../features/Cart/Cart'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderAsync, selectCurrentOrder } from '../features/orders/orderSlice';
import { selectItems } from "../features/Cart/CartSlice"
import { Navigate } from 'react-router-dom';
import { selectUserInfo, updateUserAsync } from '../features/User/userSlice';
import { discountedPrice } from '../app/constants';



// TODO: complete the errors part from as from signin

const CheckOut = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const user = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const items = useSelector(selectItems);
    const currentOrder = useSelector(selectCurrentOrder);


    const totalAmount = items.reduce((amount, item) => {
        return discountedPrice(item.product) * item.quantity + amount;
    }, 0);

    const totalItems = items.reduce((total, item) => item.quantity + total, 0);

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const handleAddress = (e) => {
        console.log(e.target.value);
        setSelectedAddress(user.addresses[e.target.value]);
    }

    const handlePayment = (e) => {
        setPaymentMethod(e.target.value);
    }

    const handleOrder = (e) => {
        if (selectedAddress && paymentMethod) {
            const order = {
                items,
                totalAmount,
                totalItems,
                user: user.id,
                paymentMethod,
                selectedAddress,
                status: "pending" // Can be changed only by the admin
            };
            dispatch(createOrderAsync(order));
            // need to redirect from here to a new page of order success.
        } else {
            // TODO: we can use proper messaging popup here
            alert('Select Address and Payment method')
        }
        //TODO: Redirect to order-success page
        //TODO: clear cart after order
        //TODO: on server change the stock number of items
    }



    return (
        <>
            {currentOrder && currentOrder.paymentMethod === 'cash' && <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />}
            {currentOrder && currentOrder.paymentMethod === 'card' && <Navigate to={`/stripe-checkout/`} replace={true} />}
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
                <div className='lg:col-span-3'>
                    <form noValidate className='px-4 pb-3' onSubmit={handleSubmit((data) => { dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] })); reset(); }
                    )}>
                        <div className="bg-white mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-md">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="font-bold text-3xl py-5 leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-xl leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name', { required: 'Name is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>


                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type='email'
                                                    id="email"
                                                    {...register('email', { required: 'Email is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type='tel'
                                                    id="phone"
                                                    {...register('phone', { required: 'Phone Number is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('street', { required: 'Street-address is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('city', { required: 'City is required' })}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('state', { required: 'State/Province is required' })}
                                                    id="state"
                                                    autoComplete="address-level1"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="number"
                                                    {...register('pinCode', { required: 'pinCode is required' })}
                                                    id="pinCode"
                                                    autoComplete="postal-code"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-between gap-x-6">
                                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                                Reset
                                            </button>
                                            <button
                                                type="submit"
                                                className=" rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Add Address
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm leading-6 flex items-start flex-col">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                        Existing Addreses
                                    </label>
                                    <p className="text-gray-500">Choose from your prior addresses.</p>

                                    <ul role="list" className='space-y-4'>
                                        {user?.addresses.map((address, index) => (
                                            <li
                                                key={index}
                                                className=" flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                                            >
                                                <div className="flex gap-x-4">
                                                    <input
                                                        onChange={handleAddress}
                                                        value={index}
                                                        name="address"
                                                        type="radio"
                                                        className="cursor-pointer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                                            {address.name}
                                                        </p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                            {address.street}
                                                        </p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                            {address.pinCode}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">
                                                        Phone: {address.phone}
                                                    </p>
                                                    <p className="text-sm leading-6 text-gray-500">
                                                        {address.city}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <fieldset className='flex items-start flex-col'>
                                    <legend className="text-start text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Choose your method.</p>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="card"
                                                name="payments"
                                                onChange={handlePayment}
                                                value='card'
                                                checked={paymentMethod === 'card'}
                                                type="radio"
                                                className="cursor-pointer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                Card
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="cash"
                                                name="payments"
                                                onChange={handlePayment}
                                                value='cash'
                                                checked={paymentMethod === 'cash'}
                                                type="radio"
                                                className="cursor-pointer h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                Cash
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>

                            </div>

                        </div>

                    </form>
                </div>
                <div className='lg:col-span-2 mr-4'>
                    <Cart btn={"Place Order"} onClick={handleOrder} />
                </div>
            </div>
        </>
    )
}

export default CheckOut
