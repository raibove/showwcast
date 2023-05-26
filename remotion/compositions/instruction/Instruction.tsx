import React from "react";
import { Audio, AbsoluteFill, Sequence, Img } from "remotion";
import "./Instruction.css";
import { Lottie } from "@remotion/lottie";
import hello from "../../../src/assets/hello.json"
import { Transition } from "../templates/company/Transition";
import instructionAudio from "../../../src/assets/instruction-audio.mp3";


export const Instruction: React.FC = () => {
    const text = [{
        id: 0,
        title: "To create a video of a company from the template"
    }
        , {
        id: 1, title:
            "Enter the company name from the showwcase profile"
    },
    { id: 2, title: "and click on submit" },
    {
        id: 3, title:
            "Now you have a video and a URL which you can share with the community."
    }];

    const getColor = (index: number) => {
        console.log(index)
        if (index % 2 === 0) {
            return '#00ddb3'
        }
        return 'antiquewhite'
    }

    return (
        <>
            <AbsoluteFill className="instruction-video">
                <Sequence from={0} durationInFrames={220}>
                    <AbsoluteFill className="hello-lottie-container">
                        <Lottie animationData={hello} className="hello-lottie" loop={false} />
                    </AbsoluteFill>
                </Sequence>
                <AbsoluteFill>
                    {text.map((t, index) => {
                        return (
                            <Sequence from={220 + (index * 130)} key={index}>
                                <Transition>
                                    <AbsoluteFill className="instruction-content" style={{ backgroundColor: getColor(index) }}>
                                        {t.title}
                                    </AbsoluteFill>
                                </Transition>
                            </Sequence>
                        )
                    })
                    }
                </AbsoluteFill>
            </AbsoluteFill>
            <Audio src={instructionAudio} />
        </>
    );
};
