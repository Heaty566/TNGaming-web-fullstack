import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { adminService } from "../../../services/";

import FormInput from "../../form/fromInput";
import FormCheck from "../../form/formCheck";
import FormDatePicker from "../../form/formDatePicker";
import FormSelectMultiple from "../../form/formSelectMultiple";
import FormTextArea from "../../form/formTextArea";
import FormImage from "../../form/formImage";
import FormBtn from "../../form/formBtn";
import FormError from "../../form/formError";

const DashNewGame = () => {
    const [genres, setGenres] = useState([]);
    const { register, handleSubmit, watch, setValue } = useForm();
    const auth = useSelector((state) => state.auth);

    const bannerWatcher = watch("banner");
    const imagesWatcher = watch("images");

    useEffect(() => {
        register("date");
        register("genreId");
    }, [register]);

    useEffect(() => {
        adminService.genres.getAllGenres(auth.token).then(({ data }) => {
            setGenres(data.data);
        });
    }, [auth.token]);

    const handleOnSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="from">
            <form className="dash__addnewgame" onSubmit={handleSubmit(handleOnSubmit)}>
                <h3 className="form__title">Add New Game</h3>
                <div className="dash__row">
                    <div className="dash__box">
                        <h4 className="form__title">About Game</h4>
                    </div>
                    <div className="dash__col dash__box">
                        <FormError error="Dsads" />
                    </div>
                </div>

                <div className="dash__row">
                    <div className="dash__col dash__box">
                        <p className="col__tag">Name</p>
                        <FormInput name="username" track={register} />
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
                        <p className="col__tag">Genre</p>
                        <FormSelectMultiple
                            label="Genre"
                            name="genreId"
                            options={genres}
                            fieldName="name"
                            fieldValue="_id"
                            onChange={setValue}
                        />
                    </div>
                    <div className="dash__box">
                        <p className="col__tag">Stock</p>
                        <FormInput name="stock" track={register} />
                    </div>
                    <div className="dash__col dash__box">
                        {/* <p>Platform</p>
                        <FormSelectMultiple
                            label="Genre"
                            options={genres}
                            fieldName="name"
                            fieldValue="_id"
                            onChange={onChange}
                        /> */}
                    </div>
                </div>
                <div className="dash__row">
                    <div className="dash__col dash__box dash__col-2">
                        <p className="col__tag">Description</p>
                        <FormTextArea name="description" limits={400} track={register} />
                    </div>
                </div>
                <div className="dash__row">
                    <div className="dash__box">
                        <p className="col__tag">Banner Image</p>
                        <FormImage name="banner" track={register} file={bannerWatcher} />
                    </div>
                    <div className="dash__box">
                        <p className="col__tag">Images</p>
                        <FormImage name="images" track={register} file={imagesWatcher} multiple />
                    </div>
                </div>
                <div className="dash__row">
                    <FormBtn label="Submit" />
                </div>
            </form>
        </div>
    );
};

export default DashNewGame;
