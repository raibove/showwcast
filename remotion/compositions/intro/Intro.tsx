import React, { ReactElement } from "react";
import {
  Audio,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";
import "./Intro.css";
import stomp from "../../../src/assets/stomp.mp3";

export const Intro: React.FC = () => {
  const { fps, width, height, durationInFrames } = useVideoConfig();

  const text = "Introducing Showwcast!! The Video Platform for the Showwcase Community!";

    
  return (
    <>
      <AbsoluteFill className="intro-video">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {text.split(" ").map((item, index) => {
            return (
              <Sequence
                key={index}
                durationInFrames={15}
                from={16 * index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "280px",
                      color: "#e9e3d9",
                    }}
                  >
                    {item}
                  </p>
                </div>
              </Sequence>
            );
          })}
        </div>

        <Audio src={stomp} />
      </AbsoluteFill>
    </>
  );
};
