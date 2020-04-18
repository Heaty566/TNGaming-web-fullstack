import React from "react";

import { colors } from "../../constant/";
import Wave from "../utils/loading/wave";

const FormBtn = ({ label, isLoading, type = "submit" }) => {
    return isLoading ? (
        <Wave height="24px" width="12px" color={colors.primaryColorMain} />
    ) : (
        <button className="form__btn" type={type}>
            {label}
        </button>
    );
};

export default FormBtn;
