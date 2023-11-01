import React from 'react'
import ProductDetails from '../features/product/components/ProductDetails';
import Navbar from '../features/Navbar/Navbar'
import Footer from "../features/common/Footer"

const ProductDeatilsPage = () => {
    return (
        <div>
            <Navbar content={<ProductDetails />} />
            <Footer />
        </div>
    )
}

export default ProductDeatilsPage
