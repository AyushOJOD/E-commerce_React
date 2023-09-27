import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/product-list/ProductList'

const Home = () => {
    return (
        <div>
            <Navbar content={<ProductList />} />
        </div>
    )
}

export default Home
