import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductDetails from '../features/admin/components/AdminProductDetails'


const AdminProductDetailsPage = () => {
    return (
        <div>
            <Navbar content={<AdminProductDetails />} />
        </div>
    )
}

export default AdminProductDetailsPage
