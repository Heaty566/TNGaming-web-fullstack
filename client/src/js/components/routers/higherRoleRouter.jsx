import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const HigherRoleRouter = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const cookie = new Cookies();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          auth.user.isAdmin ||
          auth.user.isDeveloper ||
          cookie.get("x-auth-token")
        ) {
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
