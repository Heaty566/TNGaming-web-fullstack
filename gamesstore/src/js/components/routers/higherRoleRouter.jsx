import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const HigherRoleRouter = ({ component: Component, ...rest }) => {
    const auth = useSelector((state) => state.auth);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.user.isAdmin || auth.user.isDeveloper) {
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

export default HigherRoleRouter;
