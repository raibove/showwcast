import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useVideoConfig,
  useCurrentFrame,
  Sequence,
  spring,
  Img,
} from "remotion";
import { Lottie } from "@remotion/lottie";
import team from "../../../../src/assets/team.json";
import locationIcon from "../../../../src/assets/map-pin.svg";

export const CompanyMoreInfo: React.FC<{
  location: string;
  teamSize: string;
  teamType: string;
}> = ({ location, teamSize, teamType }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title1Animation = interpolate(frame, [215, 240], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const teamSizeInitialScale = spring({
    fps,
    frame: frame - 150,
    config: {},
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <Sequence from={28}>
        <AbsoluteFill>
          <div>
            <Lottie animationData={team} />
          </div>
          <AbsoluteFill
            style={{
              textAlign: "center",
              marginTop: 80,
              fontSize: 70,
              fontWeight: 550,
              fontFamily: "Cursive",
              color: "black",
              transform: `scale(${teamSizeInitialScale})`,
            }}
          >
            We are a {teamType} of {teamSize} people
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                backgroundColor: "rgba(255, 244, 79, 1)",
                clipPath: `inset(0 ${title1Animation}% 0 0)`,
              }}
            >
              <Img src={locationIcon} style={{ width: 120, height: 100 }} />
              Located in {location}
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
