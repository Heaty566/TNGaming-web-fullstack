import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { colors } from "../../../constant";
import { tagService } from "../../../services";
import { tagsValidator } from "../../../utils/validateForm";
import { store } from "../../../stores/configStore";
import { updateLoading } from "../../../stores/loading";
import { useIsMountedRef } from "../../../utils/hooks/useIsMountedRef";

import Spinner from "../../utils/loading/spinner";
import FormAlert from "../../form/formAlert";
import FormInput from "../../form/fromInput";
import FormBtn from "../../form/formBtn";

const DashNewTag = () => {
    const { handleSubmit, register } = useForm();
    const auth = useSelector((state) => state.auth);
    const isMounted = useIsMountedRef();
    const [forceUpdate, setForceUpdate] = useState();

    const [alert, setAlert] = useState({ type: "", msg: "" });
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (auth.token)
            tagService.getAllTags(auth.token).then(({ data }) => {
                if (isMounted.current) setTags(data.data);
            });
    }, [auth.token, isMounted, forceUpdate]);

    const handleOnSubmit = (data) => {
        setAlert({ type: "", msg: "" });

        const { error } = tagsValidator.validateTag(data);
        if (error) return setAlert({ type: "error", msg: error.details[0].message });

        setLoading(true);

        tagService
            .addNewTag(auth.token, data)
            .then(() => {
                setAlert({ type: "success", msg: "Tag uploaded successfully" });
                setTags([]);
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
                <h3 className="form__title">Add New Tag</h3>
                <div className="dash__row">
                    <div className="dash__box">
                        <h4 className="form__title">Tags:</h4>
                    </div>
                    <div className="dash__col ">
                        {alert.msg && <FormAlert error={alert.msg} type={alert.type} />}
                    </div>
                </div>

                <div className="dash__row">
                    <div className="dash__col dash__col-3">
                        {tags.length ? (
                            <table className="table">
                                <thead className="table__thead">
                                    <tr className="table__tr">
                                        <th className="table__th">No</th>
                                        <th className="table__th">Tag Name</th>
                                    </tr>
                                </thead>
                                <tbody className="table__tbody">
                                    {tags.map((item, index) => (
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
                        <p className="col__tag">New Tag</p>
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

export default DashNewTag;
