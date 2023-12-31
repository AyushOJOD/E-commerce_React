import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom';
import { selectUserInfo } from '../../User/userSlice';

const ProtectedAdmin = ({ children }) => {

    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(selectUserInfo);

    if (!user) {
        return <Navigate to={'/login'} replace={true} />
    }
    if (userInfo && user.role !== 'admin') {
        return <Navigate to={'/'} replace={true} />
    }
    else {
        return (
            children
        )
    }
}

export default ProtectedAdmin
