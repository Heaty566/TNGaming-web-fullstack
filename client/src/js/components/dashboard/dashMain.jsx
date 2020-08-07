import React from "react";
import { Switch } from "react-router-dom";
import { routerURL } from "../../config/http.json";

import DashUserSetRole from "../dashboard/user/dashUserSetRole";
import DashNewGame from "../dashboard/games/dashNewGame";
import DashNewTags from "./games/dashNewTag";

import HigherRoleRouter from "../routers/higherRoleRouter";
import AdminRouter from "../routers/adminRouter";
import DashNewPlatform from "../dashboard/games/dashNewPlatform";

const DashMain = () => {
    return (
        <div className="dashboard__main">
            <Switch>
                <AdminRouter
                    path={routerURL.dashboard + "/game/tag/addnewtag"}
                    exact
                    component={DashNewTags}
                />
                <AdminRouter
                    path={routerURL.dashboard + "/game/tag/addnewplatform"}
                    exact
                    component={DashNewPlatform}
                />
                <AdminRouter path={routerURL.dashboard + "/user/setrole"} exact component={DashUserSetRole} />
                <HigherRoleRouter
                    path={routerURL.dashboard + "/game/addnewgame"}
                    exact
                    component={DashNewGame}
                />
            </Switch>
        </div>
    );
};

export default DashMain;
