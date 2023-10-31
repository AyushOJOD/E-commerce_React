import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductList from '../features/admin/components/AdminProductList'


const AdminHome = () => {
    return (
        <div>
            <Navbar content={<AdminProductList />} />
        </div>
    )
}

export default AdminHome
