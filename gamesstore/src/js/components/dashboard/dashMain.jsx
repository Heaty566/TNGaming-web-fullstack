import React from "react";
import { Switch } from "react-router-dom";
import AdminRouter from "../routers/adminRouter";
import { routerURL } from "../../config/http.json";

import DashUserSetRole from "../dashboard/user/dashUserSetRole";
import DashNewGame from "../dashboard/games/dashNewGame";
import DashNewGenre from "../dashboard/games/dashNewGenre";

const DashMain = () => {
    return (
        <div className="dashboard__main">
            <Switch>
                <AdminRouter path={routerURL.dashboard + "/user/setrole"} component={DashUserSetRole} />
                <AdminRouter path={routerURL.dashboard + "/game/addnewgame"} component={DashNewGame} />
                <AdminRouter
                    path={routerURL.dashboard + "/game/genre/addnewgenre"}
                    component={DashNewGenre}
                />
            </Switch>
        </div>
    );
};

export default DashMain;
