import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import React from "react";

export const UserProfile: React.FC<{
  title: string;
  src?: string;
}> = ({ title, src }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [30, 60], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: "#F5F0BB",
      }}
    >
      <Img
        src={src}
        style={{
          position: "absolute",
          borderRadius: 30,
          left: "10%",
          top: "20%",
          height: "50%",
          transform: `scale(${scale})`,
          filter: "drop-shadow(0px 0px 15px #000000)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "50%",
          right: "5%",
          top: "20%",
        }}
      >
        <p
          style={{
            fontSize: "5.5em",
            textAlign: "center",
            color: "#191716",
            fontFamily: "Cursive",
            fontWeight: "bold",
            opacity: titleOpacity,
          }}
        >
          Hi,
          <br />
          I'm {title}
        </p>
      </div>
    </AbsoluteFill>
  );
};
