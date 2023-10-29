import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserProfile from '../features/User/components/UserProfile'

const UserProfilePage = () => {
    return (
        <div>
            <Navbar content={<UserProfile />} />
        </div>
    )
}

export default UserProfilePage
