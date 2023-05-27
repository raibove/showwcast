import React from "react";
import {
  Audio,
  AbsoluteFill,
  Sequence,
  Img,
  useCurrentFrame,
  interpolate,
} from "remotion";
import "./Intro.css";
import stomp from "../../../src/assets/stomp.mp3";
import owl from "../../../src/assets/owl.svg";
import { Lottie } from "@remotion/lottie";
import like from "../../../src/assets/like.json"
import { Transition } from "../templates/company/Transition";

export const Intro: React.FC = () => {
  const text =
    "Introducing Showwcast! The Video Platform for the Showwcase Community!";

  const frame = useCurrentFrame();

  const artifactOpacity = interpolate(frame - 210, [5, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const artifactTranslate = interpolate(frame - 170, [5, 10], [0, 50], {
    extrapolateRight: "clamp",
  });

  const sentence2Translate = interpolate(frame - 180, [5, 10], [0, 100], {
    extrapolateRight: "clamp",
  });

  const sentence3Translate = interpolate(frame - 200, [5, 10], [140, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
        <Sequence from={170}>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "80px",
            }}
          >
            <Img src={owl} height="250px" />
            <div
              style={{
                transform: `translateY(${artifactTranslate}px)`,
              }}
            >
              Elevate your online presence
            </div>
            <div
              style={{
                transform: `translateY(${sentence2Translate}px)`,
              }}
            >
              & unlock new opportunites
            </div>
            <div
              style={{
                transform: `translateY(${sentence3Translate}px)`,
                opacity: artifactOpacity,
              }}
            >
              with Showwcast
            </div>
          </AbsoluteFill>
          <Sequence from={200}>
            <Transition>
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "90px",
              fontWeight:'bold',
              backgroundColor:'white'
            }}
          >
            <Lottie animationData={like}/>
              <div style={{position:'absolute', marginTop:200}}>
                Try Showwcast today
              </div>
          </AbsoluteFill>
          </Transition>
          </Sequence>
        </Sequence>
        <Audio src={stomp} />
      </AbsoluteFill>
    </>
  );
};
