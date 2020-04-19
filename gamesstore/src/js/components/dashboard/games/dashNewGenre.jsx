import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { colors } from "../../../constant/";
import { useSelector } from "react-redux";
import FormAlert from "../../form/formAlert";
import { genreService } from "../../../services/";
import FormInput from "../../form/fromInput";
import FormBtn from "../../form/formBtn";
import { genresValidator } from "../../../utils/validateForm/";

const DashNewGenre = () => {
    const { handleSubmit, register } = useForm();
    const [alert, setAlert] = useState({ type: "", msg: "" });
    const auth = useSelector((state) => state.auth);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (auth.token)
            genreService.getAllGenres(auth.token).then(({ data }) => {
                setGenres(data.data);
            });
    }, [auth.token]);

    const handleOnSubmit = (data) => {
        setAlert({ type: "", msg: "" });

        const { error } = genresValidator.validateGenre(data);
        if (error) return setAlert({ type: "error", msg: error.details[0].message });

        setLoading(true);

        genreService
            .addNewGenre(auth.token, data)
            .then(() => {
                setAlert({ type: "success", msg: "Genre uploaded successfully" });
            })
            .catch(({ response }) => {
                setAlert({ type: "error", msg: response.data.msg });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="from">
            <form className="dash__addnewgame" onSubmit={handleSubmit(handleOnSubmit)}>
                <h3 className="form__title">Add New Genre</h3>
                <div className="dash__row">
                    <div className="dash__box">
                        <h4 className="form__title">Genre:</h4>
                    </div>
                    <div className="dash__col ">
                        {alert.msg && <FormAlert error={alert.msg} type={alert.type} />}
                    </div>
                </div>

                <div className="dash__row">
                    <div className="dash__col dash__col-3">
                        <table className="table">
                            <thead className="table__thead">
                                <tr className="table__tr">
                                    <th className="table__th">No</th>
                                    <th className="table__th">Genre Name</th>
                                </tr>
                            </thead>
                            <tbody className="table__tbody">
                                {genres.map((item, index) => (
                                    <tr className="table__tr" key={item._id}>
                                        <td className="table__td">{index}</td>
                                        <td className="table__td">{item.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="dash__row">
                    <div className="dash__box">
                        <p className="col__tag">New Genre</p>
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

export default DashNewGenre;
