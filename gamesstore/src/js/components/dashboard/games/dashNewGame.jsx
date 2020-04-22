import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { colors } from "../../../constant/";
import { tagService, developerService, platformService } from "../../../services/";
import { gamesValidator } from "../../../utils/validateForm/";
import { store } from "../../../stores/configStore";
import { updateLoading } from "../../../stores/loading";
import { useIsMountedRef } from "../../../utils/hooks/useIsMountedRef";

import Spinner from "../../utils/loading/spinner";
import FormInput from "../../form/fromInput";
import FormCheck from "../../form/formCheck";
import FormDatePicker from "../../form/formDatePicker";
import FormSelectMultiple from "../../form/formSelectMultiple";
import FormTextArea from "../../form/formTextArea";
import FormImage from "../../form/formImage";
import FormBtn from "../../form/formBtn";
import FormAlert from "../../form/formAlert";

function DashNewGame() {
    const { register, handleSubmit, watch, setValue } = useForm();
    const auth = useSelector((state) => state.auth);
    const isMounted = useIsMountedRef();

    const [tags, setTags] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [alert, setAlert] = useState({ type: "", msg: "" });
    const [submitLoading, setSubmitLoading] = useState(false);

    const bannerWatcher = watch("banner");
    const imagesWatcher = watch("imagesGame");
    const descriptionWatcher = watch("description");

    useEffect(() => {
        register("date");
        register("tagId");
        register("platformId");
    }, [register]);

    useEffect(() => {
        if (auth.token) {
            tagService.getAllTags(auth.token).then(({ data }) => {
                if (isMounted.current) setTags(data.data);
            });
            platformService.getAllPlatform(auth.token).then(({ data }) => {
                if (isMounted.current) setPlatforms(data.data);
            });
        }
    }, [auth.token, isMounted]);

    const handleOnSubmit = (data) => {
        setAlert({ type: "", msg: "" });

        data.imagesGame = [data.banner[0], ...data.imagesGame];
        delete data.banner;

        const { error } = gamesValidator.validateGameNew(data);
        if (error) return setAlert({ type: "error", msg: error.details[0].message });

        const newGame = new FormData();
        for (let item of data.imagesGame) {
            newGame.append("imagesGame", item);
        }

        for (let item of data.tagId) {
            newGame.append("tagId[]", item);
        }

        for (let item of data.platformId) {
            newGame.append("platformId[]", item);
        }

        newGame.append("name", data.name);
        newGame.append("price", data.price);
        newGame.append("publisher", data.publisher);
        newGame.append("available", data.available);
        newGame.append("stock", data.stock);
        newGame.append("description", data.description);
        newGame.append("date", data.date);

        setSubmitLoading(true);

        developerService
            .addNewGame(auth.token, newGame)
            .then(() => {
                setAlert({ type: "success", msg: "Game uploaded successfully" });
            })
            .catch(({ response }) => {
                setAlert({ type: "error", msg: response.data.msg });
            })
            .finally(() => {
                setSubmitLoading(false);
                store.dispatch({
                    type: updateLoading.type,
                    payload: { value: 100 },
                });
            });
    };

    return (
        <div className="from">
            <form className="dash__addnewgame" onSubmit={handleSubmit(handleOnSubmit)}>
                <h3 className="form__title">Add New Game</h3>
                <div className="dash__row">
                    <div className="dash__box">
                        <h4 className="form__title">About Game</h4>
                    </div>
                    <div className="dash__col ">
                        {alert.msg && <FormAlert error={alert.msg} type={alert.type} />}
                    </div>
                </div>

                <div className="dash__row">
                    <div className="dash__col dash__box">
                        <p className="col__tag">Name</p>
                        <FormInput name="name" track={register} />
                    </div>
                    <div className="dash__box">
                        <p className="col__tag">Price</p>
                        <FormInput name="price" track={register} />
                    </div>

                    <div className="dash__box">
                        <p className="col__tag">Date</p>
                        <FormDatePicker onChange={setValue} name="date" />
                    </div>
                </div>

                <div className="dash__row">
                    <div className="dash__box">
                        <p className="col__tag">Publisher</p>
                        <FormInput name="publisher" track={register} />
                    </div>

                    <div className="dash__box">
                        <p className="col__tag">Developer</p>
                        <FormInput placeholder={auth.user.username} disabled />
                    </div>
                    <div className="dash__box">
                        <p className="col__tag">Available</p>
                        <FormCheck
                            name="available"
                            track={register}
                            description="Customer can’t find your game if it’s unavailable."
                        />
                    </div>
                </div>

                <div className="dash__row">
                    <div className="dash__box">
                        <p className="col__tag">Tags</p>
                        {tags.length ? (
                            <FormSelectMultiple
                                label="Tags"
                                name="tagId"
                                options={tags}
                                fieldName="name"
                                fieldValue="_id"
                                onChange={setValue}
                            />
                        ) : (
                            <Spinner
                                height={25}
                                border={5}
                                color={colors.secondaryColorMain}
                                borderColor={colors.primaryColorLighter}
                            />
                        )}
                    </div>
                    <div className="dash__box">
                        <p className="col__tag">Stock</p>
                        <FormInput name="stock" track={register} />
                    </div>
                    <div className="dash__col dash__box">
                        <p className="col__tag">Platforms</p>
                        {platforms.length ? (
                            <FormSelectMultiple
                                label="Platforms"
                                name="platformId"
                                options={platforms}
                                fieldName="name"
                                fieldValue="_id"
                                onChange={setValue}
                            />
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
                    <div className="dash__col dash__col-2">
                        <p className="col__tag">Description</p>
                        <FormTextArea
                            name="description"
                            limits={5000}
                            track={register}
                            value={descriptionWatcher}
                        />
                    </div>
                </div>
                <div className="dash__row">
                    <div className="dash__box">
                        <p className="col__tag">Banner Image</p>
                        <FormImage name="banner" track={register} file={bannerWatcher} />
                    </div>
                    <div className="dash__box">
                        <p className="col__tag">Images</p>
                        <FormImage name="imagesGame" track={register} file={imagesWatcher} multiple />
                    </div>
                </div>
                <div className="dash__row">
                    <div className="dash__box">
                        <FormBtn label="Submit" isLoading={submitLoading} color={colors.secondaryColorMain} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DashNewGame;
