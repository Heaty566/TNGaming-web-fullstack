import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRouter = ({ component: Component, ...rest }) => {
    const auth = useSelector((state) => state.auth);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (true) {
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

export default AdminRouter;
