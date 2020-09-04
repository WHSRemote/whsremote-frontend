import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { Loading } from '../components/loading/Loading'; 

function PrivateRoute ({ component, ...args }) {
    return (
        <Route
            component={withAuthenticationRequired(component, {
                returnTo: "/home",
                onRedirecting: () => <Loading />,
            })}
            {...args}
        />
    )
  
}

export default PrivateRoute;