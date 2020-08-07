import React from "react";

import DashController from "../components/dashboard/dashController";
import DashMain from "../components/dashboard/dashMain";

const Dashboard = () => {
    document.title = "Dashboard | TNGaming";

    return (
        <div className="dashboard">
            <DashController />
            <DashMain />
        </div>
    );
};

export default Dashboard;
