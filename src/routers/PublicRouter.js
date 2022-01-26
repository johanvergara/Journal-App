import React from 'react'
import { Redirect } from 'react-router-dom';
 
export const PublicRouter = ({isAuthenticated, children}) => {
 
    return isAuthenticated ?
            <Redirect to={'/'} />
            :
            children
}
