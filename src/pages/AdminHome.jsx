import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductList from '../features/admin/components/AdminProductList'
import Footer from '../features/common/Footer'


const AdminHome = () => {
    return (
        <div>
            <Navbar content={<AdminProductList />} />
            <Footer />
        </div>
    )
}

export default AdminHome
