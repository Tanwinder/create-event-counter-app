 import React from 'react';
 import {useSelector} from 'react-redux';
 import { Route, Redirect, useLocation } from 'react-router-dom';
 const PrivateRoute = (props) => {
    const user = useSelector(state => state?.user?.userInfo);
    const { component: Component, ...rest } = props;
    const location = useLocation();
    if(user){
       return ( <Route {...rest} render={(props) => 
            (<Component {...props}/>)
             }
          />
        )}
    //redirect if there is no user 
    return (
        <Redirect
            to={{
            pathname: "/login",
            state: { from: location }
            }}
        />
    )
 }

 export default PrivateRoute;