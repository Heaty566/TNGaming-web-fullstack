import React, { useState, useEffect } from "react";

import _ from "lodash";
import moment from "moment";

function FormDatePicker({ onChange, name, track }) {
    const [day, setDay] = useState("01");
    const [days, setDays] = useState([]);
    const [month, setMonth] = useState("01");
    const [months, setMonths] = useState([]);
    const [year, setYear] = useState("2000");
    const [years, setYears] = useState([]);

    useEffect(() => {
        setDays(
            _.range(1, moment(`${year}-${month}`).daysInMonth() + 1).map((item) => ("0" + item).slice(-2))
        );
        setMonths(_.range(1, 13).map((item) => ("0" + item).slice(-2)));

        setYears(_.range(2000, Number(moment().format("YYYY")) + 5));
        onChange(name, `${year}-${month}-${day}`);
    }, [day, month, year, onChange, name]);

    return (
        <div className="form__datepicker">
            <select ref={track} value={day} onChange={({ currentTarget: input }) => setDay(input.value)}>
                {days.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </select>
            <select value={month} onChange={({ currentTarget: input }) => setMonth(input.value)}>
                {months.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </select>
            <select value={year} onChange={({ currentTarget: input }) => setYear(input.value)}>
                {years.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </select>
        </div>
    );
}

export default FormDatePicker;
