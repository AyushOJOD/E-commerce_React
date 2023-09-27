import React from 'react'
import ProductDetails from '../features/product-list/components/ProductDetails';
import Navbar from '../features/Navbar/Navbar'


const ProductDeatilsPage = () => {
    return (
        <div>
            <Navbar content={<ProductDetails />} />
        </div>
    )
}

export default ProductDeatilsPage