import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  Sequence,
} from "remotion";
import {CompanyName} from "./CompanyName"

export const CompanyIntro: React.FC<{
  name: string;
  logo: string;
  oneliner: string;
}> = ({ name, logo, oneliner }) => {
  const frame = useCurrentFrame();
  // const { durationInFrames, fps, width } = useVideoConfig();


  return (
    <AbsoluteFill style={{ backgroundColor: "#D4E0FF" }}>
      <CompanyName name={name} logo={logo} oneliner={oneliner}/>
    </AbsoluteFill>
  );
};
