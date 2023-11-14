import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthState, selectLoggedInUser, signOutAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';

const LogOut = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(() => {
        dispatch(signOutAsync());
    });

    return (
        <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>
    )
}

export default LogOut
