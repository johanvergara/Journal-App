import React from 'react';
import { Redirect } from 'react-router-dom';

export const PrivateRouter = ({isAuthenticated, children}) => {
    return (
        (isAuthenticated) 
        ? (children)
        : <Redirect to={'/auth'} />
    )
};
