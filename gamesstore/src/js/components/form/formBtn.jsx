import React from "react";

import { colors } from "../../constant/";
import Loading from "../../components/loading/loading";

const FormBtn = ({ label, isLoading, type = "submit" }) => {
    return isLoading ? (
        <Loading height="24px" width="12px" color={colors.primaryColorMain} />
    ) : (
        <button className="form__btn" type={type}>
            {label}
        </button>
    );
};

export default FormBtn;
