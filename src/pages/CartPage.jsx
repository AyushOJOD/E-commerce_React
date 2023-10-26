import React from 'react'
import Cart from '../features/Cart/Cart'

const CartPage = () => {

    return (
        <div>
            <Cart whereto={'/checkout'} btn={"CheckOut"} />
        </div>
    )
}

export default CartPage
