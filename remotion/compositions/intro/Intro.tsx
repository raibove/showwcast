import React from "react";
import { Audio, AbsoluteFill, Sequence, Img } from "remotion";
import "./Intro.css";
import stomp from "../../../src/assets/stomp.mp3";
import owl from "../../../src/assets/owl.svg";

export const Intro: React.FC = () => {
  const text =
    "Introducing Showwcast! The Video Platform for the Showwcase Community!";

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
          <Sequence
            from={0}
            durationInFrames={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Img src={owl} style={{ height: "80vh", width: "80%" }} />
          </Sequence>
          {text.split(" ").map((item, index) => {
            return (
              <Sequence
                key={index}
                durationInFrames={15}
                from={18 * index + 1}
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
