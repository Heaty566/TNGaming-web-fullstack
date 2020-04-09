import { css } from "styled-components";

export default {
    //layout
    gridFullMain: css`
        grid-column-start: 1;
        grid-column-end: 4;
    `,

    flexCenter: css`
        display: flex;
        justify-content: center;
        align-items: center;
    `,

    flexBetween: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,

    flexAround: css`
        display: flex;
        justify-content: space-around;
        align-items: center;
    `,

    //height width
    maxHeightWidth: css`
        height: 100%;
        width: 100%;
    `,

    inheritHeightWidth: css`
        width: inherit;
        height: inherit;
    `,

    //border margin padding
    borderR2: css`
        border-radius: 2px;
    `,

    noBorderAndOutline: css`
        border: none;
        outline: none;
    `,

    //custom
    noDecorateAndList: css`
        list-style: none;
        text-decoration: none;
    `,
};
