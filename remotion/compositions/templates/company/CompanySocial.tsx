import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

export const CompanySocial: React.FC<{ socials: string[] }> = ({ socials }) => {
  const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

  const title1Animation = interpolate(frame, [30, 45], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <AbsoluteFill
        style={{
          backgroundColor: "#D4E0FF",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          color: "black",
          height: "100%",
          fontSize: "80px",
        }}
      >
        <span
          style={{
            clipPath: `inset(0 ${title1Animation}% 0 0)`,
            fontWeight: 500,
          }}
        >
          Find Us On
        </span>
        <div>
          {socials.slice(0,5).map((social, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#242424",
                  padding: "2px 25px",
                  margin: "10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transform: `scale(${interpolate(spring({
                    fps,
                    frame: frame - (40*(index+1)),
                    durationInFrames: 20,
                    config: { damping: 500 },
                  }),
                  [0,1],
                  [0,1])
                })`
                }}
                onClick={() => window.open(social, "_blank")}
              >
                <span style={{ fontSize: "50px", color: "white" }}>
                  {social}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </>
  );
};
