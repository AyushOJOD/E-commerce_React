import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { Link, Navigate } from "react-router-dom";
import { deleteItemAsync, selectCartLoaded, selectCartStatus, selectItems, updateCartAsync } from "./CartSlice";
import { discountedPrice } from "../../app/constants";
import { Grid } from "react-loader-spinner";
import Modal from "../common/Modal";


export default function Cart({ whereto, btn, onClick }) {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded)
  const [openModal, setOpenModal] = useState(false);

  const totalAmount = items.reduce((amount, item) => {
    return discountedPrice(item.product) * item.quantity + amount;
  }, 0);


  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handlerQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }))
  }

  const handleRemove = (e, itemId) => {
    dispatch(deleteItemAsync(itemId))
  }

  return (
    <>
      {!items.length && cartLoaded && <Navigate to={'/cart/empty'} replace={true} />}
      <div className="bg-white mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Cart
          </h2>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200 py-4">

              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${discountedPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <label htmlFor="quantity" className="text-black font-semibold">Qty
                        <select className="rounded-md mx-5" onChange={e => handlerQuantity(e, item)} value={item.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </label>

                      <div className="flex">
                        <Modal
                          title={`Delete item`}  // TODO: make this item as item.title
                          message="Are you sure you want to delete this Cart item ?"
                          dangerOption="Delete"
                          cancelOption="Cancel"
                          dangerAction={(e) => handleRemove(e, item.id)}
                          cancelAction={() => setOpenModal(null)}
                          showModal={openModal === item.id}
                        ></Modal>
                        <button
                          onClick={e => { setOpenModal(item.id) }}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
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
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <button onClick={onClick}>
              <Link
                to={whereto}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                {btn}
              </Link>
            </button>
          </div>


          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
