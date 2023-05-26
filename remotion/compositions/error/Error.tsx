import React from "react";
import { AbsoluteFill, Sequence, Img } from "remotion";
import "./Error.css";
import { Transition } from "../templates/company/Transition";
import sadOwl from "../../../src/assets/sadowl.svg";

export const Error: React.FC<{
    error: string
}> = ({error}) => {
   
    const getColor = (index: number) => {
        console.log(index)
        if (index % 2 === 0) {
            return '#00ddb3'
        }
        return 'antiquewhite'
    }

    return (
        <>
            <AbsoluteFill className="error-video">
                <AbsoluteFill>
                    <span className="error-video-text">Oops!! The {error} you entered was not found on Showwcase.</span>
                    <Img src={sadOwl} className="sad-owl-error" />
                </AbsoluteFill>
                <AbsoluteFill>
                    
                </AbsoluteFill>
            </AbsoluteFill>
        </>
    );
};
