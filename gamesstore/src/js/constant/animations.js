import { keyframes } from "styled-components";

export default {
    rotate: keyframes`
           0% {
                 transform: rotate(0);
           }
     
           100% {
                 transform: rotate(360deg);
           }
     `,

    fadeIn: keyframes`
            0% {
                 opacity: 0;
           }
     
           100% {
                 opacity: 1;
           }
     `,

    fadeOut: keyframes`
            0% {
                 opacity: 1;
           }
     
           100% {
                 opacity: 0;
           }
     `,
};
