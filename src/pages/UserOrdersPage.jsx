import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserOrders from '../features/User/components/UserOrders'

const UserOrdersPage = () => {
  return (
    <div>
      <Navbar content={<UserOrders />} />
    </div>
  )
}

export default UserOrdersPage
