import React from "react";
import { Audio, AbsoluteFill, Sequence } from "remotion";
import "./Instruction.css";
import { Lottie } from "@remotion/lottie";
import hello from "../../../src/assets/hello.json"
import { Transition } from "../templates/company/Transition";
import instructionAudio from "../../../src/assets/instruction-audio.mp3";


interface InstructionProp {
 id: number;
 title: string;
}

export const Instruction: React.FC<{
    instructions: InstructionProp[] 
}> = ({instructions}) => {
   

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
                    {instructions.map((instruction, index) => {
                        return (
                            <Sequence from={220 + (index * 130)} key={index}>
                                <Transition>
                                    <AbsoluteFill className="instruction-content" style={{ backgroundColor: getColor(index) }}>
                                        {instruction.title}
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
