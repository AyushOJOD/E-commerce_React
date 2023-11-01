import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminOrders from '../features/admin/components/AdminOrders'

const AdminOrdersPage = () => {
    return (
        <div>
            <Navbar content={<AdminOrders />} />
        </div>
    )
}

export default AdminOrdersPage
