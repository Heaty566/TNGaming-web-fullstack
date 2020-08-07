import React from "react";

import { dashboard } from "../../config/linkURL.json";
import ConSection from "./controlers/conSection";

function DashController() {
    return (
        <div className="dashboard__controller">
            <h3 className="controller__title">Doashboard</h3>
            <span className="controller__divider"></span>
            {dashboard.contronller.map((tag, index) => (
                <ConSection key={index} tag={tag} />
            ))}
        </div>
    );
}

export default DashController;
