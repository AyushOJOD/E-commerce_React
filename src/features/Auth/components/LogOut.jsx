import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthState, selectLoggedInUser, signOutAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';
import Loader from '../../common/Loader';

const LogOut = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const status = useSelector(selectAuthState);

    useEffect(() => {
        dispatch(signOutAsync());
    });

    return (
        <div>
            {status === 'loading' && <Loader />}
            {status === 'idle' && !user && <Navigate to='/login' replace={true} />}
        </div>
    )
}

export default LogOut
