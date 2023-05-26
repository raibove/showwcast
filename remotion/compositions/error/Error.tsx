import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import "./Error.css";
import sadOwl from "../../../src/assets/sadowl.svg";
import excited from "../../../src/assets/hand.svg";

export const Error: React.FC<{
  error: string;
}> = ({ error }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title1Animation = interpolate(frame, [0, 45], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const title2Animation = interpolate(frame, [70, 95], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonScale = spring({
    fps,
    frame: frame - 80,
    config: {},
  });

  return (
    <>
      <AbsoluteFill className="error-video">
        <Sequence from={0} durationInFrames={70}>
          <AbsoluteFill>
            <div
              style={{
                clipPath: `inset(0 ${title1Animation}% 0 0)`,
              }}
            >
              <span className="error-video-text">
                Oops!! The {error} you entered was not found on Showwcase.
              </span>
            </div>
            <Img src={sadOwl} className="sad-owl-error" />
          </AbsoluteFill>
        </Sequence>
        <Sequence from={70}>
          <AbsoluteFill className="error-cta">
            <span
              className="error-video-text"
              style={{
                clipPath: `inset(0 ${title2Animation}% 0 0)`,
              }}
            >
              Create your profile on Showwcase now
            </span>
            
              <button
                className="join-showwcase"
                onClick={() => {
                  window.open("https://showwcase.com", "_blank");
                }}
                style={{
                    transform: `scale(${buttonScale})`,
                  }}
              >
                Join Showwcase
              </button>
            <Img src={excited} className="excited"/>
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
