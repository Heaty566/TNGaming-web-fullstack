import React from "react";
import Cookies from "universal-cookie";
import { Route, Redirect } from "react-router-dom";

const ProtectedRouter = ({ component: Component, ...rest }) => {
    const cookies = new Cookies();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!cookies.get("x-auth-token")) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRouter;
