import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductForm from '../features/admin/components/ProductForm'

const AdminProductFormPage = () => {
    return (
        <div>
            <Navbar content={<ProductForm />} />
        </div>
    )
}

export default AdminProductFormPage
