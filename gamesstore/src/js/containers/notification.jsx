import React from "react";
import { useSelector } from "react-redux";

import NotificationUI from "../components/notification/notificationUI";

function Notification() {
    const notification = useSelector((state) => state.entities.notification);

    return notification.msg ? <NotificationUI content={notification.msg} /> : null;
}

export default Notification;
