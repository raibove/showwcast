import React from "react";
import { AbsoluteFill, Img } from "remotion";
import "./Error.css";
import sadOwl from "../../../src/assets/sadowl.svg";

export const Error: React.FC<{
    error: string
}> = ({error}) => {

    return (
        <>
            <AbsoluteFill className="error-video">
                <AbsoluteFill>
                    <span className="error-video-text">Oops!! The {error} you entered was not found on Showwcase.</span>
                    <Img src={sadOwl} className="sad-owl-error" />
                </AbsoluteFill>
            </AbsoluteFill>
        </>
    );
};
