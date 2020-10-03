import React from 'react';
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route >
      {
        () => props.loggedIn === true ? <Component {...props} /> : <Redirect to="./signup"/>
      }
    </Route>
  )
};

export default ProtectedRoute;
