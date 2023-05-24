import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Transition = ({ children }: any) => {
  const { fps, width } = useVideoConfig();
  const frame = useCurrentFrame();
  const spr = spring({
    fps,
    frame,
    config: {
      // mass: 0.1,
      // damping: 00,
    },
  });
  const translation = interpolate(spr, [0, 1], [width, 0]);
  const perc = interpolate(spr, [0, 1], [50, 0]);
  return (
    <AbsoluteFill
      style={{
        borderTopLeftRadius: `${perc}% 50%`,
        borderBottomLeftRadius: `${perc}% 50%`,
        left: translation,
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      <AbsoluteFill>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};