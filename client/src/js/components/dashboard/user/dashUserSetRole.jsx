import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import FormAlert from "../../form/formAlert";
import { colors } from "../../../constant/";
import { useIsMountedRef } from "../../../utils/hooks/useIsMountedRef";

import FormBtn from "../../form/formBtn";
import FormCheck from "../../form/formCheck";
import Spinner from "../../utils/loading/spinner";
import FormSelect from "../../form/formSelect";

import { adminService } from "../../../services/";

function DashUserSetRole() {
    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, watch } = useForm();
    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState({ type: "", msg: "" });
    const [forceUpdate, setForceUpdate] = useState();
    const userIdWatcher = watch("userId");
    const userRef = useRef();
    const idMounted = useIsMountedRef();

    useEffect(() => {
        if (userIdWatcher) {
            const user = users.filter((item) => item._id === userIdWatcher)[0];
            userRef.current = user;
            setValue("isAdmin", user.isAdmin);
            setValue("isDeveloper", user.isDeveloper);
        }
    }, [userIdWatcher, setValue,users]);

    useEffect(() => {
        register("userId");
    }, [register]);

    useEffect(() => {
        if (token)
            adminService.allUsers(token).then(({ data }) => {
                if (idMounted.current) setUsers(data.data);
            });
    }, [token, idMounted, forceUpdate]);

    const handleOnSubmit = async (data) => {
        setLoading(true);
        setAlert({ msg: "", type: "" });

        const adminToggle =
            data.isAdmin !== userRef.current.isAdmin
                ? adminService.toggleUserAdmin(token, data.userId)
                : Promise.resolve();
        const developerToggle =
            data.isDeveloper !== userRef.current.isDeveloper
                ? adminService.toggleUserDeveloper(token, data.userId)
                : Promise.resolve();
    
        Promise.all([adminToggle, developerToggle])
            .then((prom) => {
                prom.filter((item) => item).forEach(({ data: res }) => {
                    setAlert({ msg: res.msg, type: "success" });
                });
            })
            .catch(({ response }) => {
                setAlert({ type: "error", msg: response.data.msg });
            })
            .finally(() => {
                setForceUpdate({});
                setLoading(false);
            });
    };

    return (
        <div className="from">
            <form className="dash__addnewgame" onSubmit={handleSubmit(handleOnSubmit)}>
                <h3 className="form__title">Set User's Role</h3>
                <div className="dash__row">
                    <div className="dash__box">
                        <h4 className="form__title">Users:</h4>
                    </div>
                    <div className="dash__col ">
                        {alert.msg && <FormAlert error={alert.msg} type={alert.type} />}
                    </div>
                </div>

                <div className="dash__row">
                    <div className="dash__col dash__col-3">
                        {users.length ? (
                            <table className="table">
                                <thead className="table__thead">
                                    <tr className="table__tr">
                                        <th className="table__th">No</th>
                                        <th className="table__th">Name</th>
                                        <th className="table__th">Username</th>
                                        <th className="table__th">Admin</th>
                                        <th className="table__th">Developer</th>
                                    </tr>
                                </thead>
                                <tbody className="table__tbody">
                                    {users.map((item, index) => (
                                        <tr className="table__tr" key={item._id}>
                                            <td className="table__td">{index + 1}</td>
                                            <td className="table__td">{item.name}</td>
                                            <td className="table__td">{item.username}</td>
                                            <td className="table__td">{item.isAdmin ? "Yes" : "No"}</td>
                                            <td className="table__td">{item.isDeveloper ? "Yes" : "No"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <Spinner
                                height={25}
                                border={5}
                                color={colors.secondaryColorMain}
                                borderColor={colors.primaryColorLighter}
                            />
                        )}
                    </div>
                </div>

                <div className="dash__row">
                    <div className="dash__box">
                        <p className="col__tag">Set Role</p>

                        <FormSelect
                            name="userId"
                            placeholder="name"
                            options={users}
                            label="user"
                            fieldName="username"
                            fieldValue="_id"
                            track={setValue}
                        />
                    </div>
                    <div className="dash__box">
                        <p className="col__tag">Set Admin</p>

                        <FormCheck label="" name="isAdmin" track={register} />
                    </div>
                    <div className="dash__box">
                        <p className="col__tag">Set Developer</p>

                        <FormCheck label="" name="isDeveloper" track={register} />
                    </div>
                </div>
                <div className="dash__row">
                    <div className="dash__box">
                        <FormBtn label="Submit" isLoading={loading} color={colors.secondaryColorMain} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DashUserSetRole;
