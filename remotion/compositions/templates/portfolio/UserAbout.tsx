import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import React from "react";

export const UserAbout: React.FC<{
  about: string;
}> = ({ about }) => {
  const frame = useCurrentFrame();

  const slideProgress = interpolate(frame, [180, 220], [-100, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        // transform: `translateY(${slideProgress}%)`,
        backgroundColor: "#573280",
      }}
    >
      <p
        style={{
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "7",
          display: "-webkit-box",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "4.5em",
          textAlign: "center",
          color: "white",
          fontFamily: "Roboto",
        }}
      >
        <span style={{ fontFamily: "Cursive" }}>About me</span>
        <br />
        {about}
      </p>
    </AbsoluteFill>
  );
};
