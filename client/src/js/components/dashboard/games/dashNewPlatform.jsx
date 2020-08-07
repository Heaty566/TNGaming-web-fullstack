import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { colors } from "../../../constant";
import { platformService } from "../../../services";
import { platformValidator } from "../../../utils/validateForm/";
import { store } from "../../../stores/configStore";
import { updateLoading } from "../../../stores/loading";
import { useIsMountedRef } from "../../../utils/hooks/useIsMountedRef";

import Spinner from "../../utils/loading/spinner";
import FormAlert from "../../form/formAlert";
import FormInput from "../../form/fromInput";
import FormBtn from "../../form/formBtn";

const DashNewPlatform = () => {
    const { handleSubmit, register } = useForm();
    const [forceUpdate, setForceUpdate] = useState();
    const isMounted = useIsMountedRef();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ type: "", msg: "" });

    const auth = useSelector((state) => state.auth);
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        if (auth.token)
            platformService.getAllPlatform(auth.token).then(({ data }) => {
                if (isMounted.current) setPlatforms(data.data);
            });
    }, [auth.token, isMounted, forceUpdate]);

    const handleOnSubmit = (data) => {
        setAlert({ type: "", msg: "" });

        const { error } = platformValidator.validatePlatform(data);
        if (error) return setAlert({ type: "error", msg: error.details[0].message });

        setLoading(true);

        platformService
            .addNewPlatform(auth.token, data)
            .then(() => {
                setAlert({ type: "success", msg: "Platform uploaded successfully" });
                setPlatforms([]);
                setForceUpdate({});
            })
            .catch(({ response }) => {
                setAlert({ type: "error", msg: response.data.msg });
            })
            .finally(() => {
                setLoading(false);
                store.dispatch({
                    type: updateLoading.type,
                    payload: { value: 100 },
                });
            });
    };

    return (
        <div className="from">
            <form className="dash__addnewgame" onSubmit={handleSubmit(handleOnSubmit)}>
                <h3 className="form__title">Add New Platform</h3>
                <div className="dash__row">
                    <div className="dash__box">
                        <h4 className="form__title">Platforms:</h4>
                    </div>
                    <div className="dash__col ">
                        {alert.msg && <FormAlert error={alert.msg} type={alert.type} />}
                    </div>
                </div>

                <div className="dash__row">
                    <div className="dash__col dash__col-3">
                        {platforms.length ? (
                            <table className="table">
                                <thead className="table__thead">
                                    <tr className="table__tr">
                                        <th className="table__th">No</th>
                                        <th className="table__th">Platform Name</th>
                                    </tr>
                                </thead>
                                <tbody className="table__tbody">
                                    {platforms.map((item, index) => (
                                        <tr className="table__tr" key={item._id}>
                                            <td className="table__td">{index + 1}</td>
                                            <td className="table__td">{item.name}</td>
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
                        <p className="col__tag">New Platform</p>
                        <FormInput name="name" placeholder="name" track={register} />
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
};

export default DashNewPlatform;
