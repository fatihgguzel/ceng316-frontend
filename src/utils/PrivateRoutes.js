import { Navigate, Outlet } from 'react-router-dom'
import React, { useContext } from 'react';
import { UserContext } from '../Providers/context';




export default function PrivateRoutes(props){
    const { user } = useContext(UserContext);
    const isPermitted = user.role && props.roleRestrictions.includes(user.role);
    
    return (
        user.authToken ? isPermitted ? <Outlet/> : <Navigate to='/dashboard'/> : <Navigate to='/'/>
    )
}