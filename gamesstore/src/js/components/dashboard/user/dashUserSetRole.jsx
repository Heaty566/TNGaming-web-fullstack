import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import FormSelect from "../../form/formSelect";
import FormBtn from "../../form/formBtn";
import FormCheck from "../../form/formCheck";
import { adminService } from "../../../services/";

function DashUserSetRole() {
    const token = useSelector((state) => state.auth.token);
    const [users, setUsers] = useState([]);
    const [usedId, setUserId] = useState(null);

    useEffect(() => {
        if (token)
            adminService.allUsers(token).then(({ data }) => {
                setUsers(data.data);
            });
    }, [token]);

    const handleOnChange = ({ _id }) => {
        setUserId(_id);
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        adminService.toggleUserAdmin(token, usedId);
    };

    return (
        <div className=" form dash__role">
            <h3 className="form__title ">Set User Role</h3>
            <form className="dash__userSetRole dash__grid" onSubmit={handleOnSubmit}>
                <FormSelect label="Select User" options={users} field="username" onChange={handleOnChange} />

                <div>
                    <FormCheck name="admin" label="Admin" />
                    <FormCheck name="developer" label="Developer" />
                </div>
                <FormBtn label="Submit" />
            </form>
        </div>
    );
}

export default DashUserSetRole;
