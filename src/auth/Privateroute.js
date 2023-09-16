
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoute = ({ path, ...props }) => {
    const { currentUser } = React.useContext(UserContext);

    return currentUser ? <Route path={path} {...props} /> : <Navigate to="/login" />;
};

export default PrivateRoute;

