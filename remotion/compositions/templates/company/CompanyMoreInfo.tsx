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
import { Transition } from "./Transition";
import locationIcon from "../../../../src/assets/map-pin.svg";

export const CompanyMoreInfo: React.FC<{
  location: string;
}> = ({ location }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const title1Animation = interpolate(frame, [215, 240], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const title2Animation = interpolate(frame, [355, 380], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const title3Animation = interpolate(frame, [395, 410], [100, 0], {
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
      <Sequence from={40}>
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
          We are a Growing team of 15-20 people
          <div
              style={{
                justifyContent:'center',
                display:'flex',
                backgroundColor:'rgba(255, 244, 79, 1)',
                clipPath: `inset(0 ${title1Animation}% 0 0)`,
              }}
            >
              <Img src={locationIcon} style={{ width: 120, height: 100 }} />
              Located in {location}
            </div>
        </AbsoluteFill>
      </AbsoluteFill>
      </Sequence>
      {/* <Sequence from={285}>
        <Transition>
          <AbsoluteFill
            style={{
              fontFamily: "MonaSans",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              color: "black",
              // top: "50%",
              // transform: "translateY(-50%)",
              textAlign: "center",
              backgroundColor: "#D4E0FF",
            }}
          >
            <div
              style={{
                justifyContent:'center',
                display:'flex',
                fontWeight: 800,
                fontSize: 80,
                clipPath: `inset(0 ${title1Animation}% 0 0)`,
              }}
            >
              <Img src={locationIcon} style={{ width: 120, height: 100 }} />
              Located in {location}
            </div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 80,
                clipPath: `inset(0 ${title2Animation}% 0 0)`,
              }}
            >
              Use
            </div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 80,
                clipPath: `inset(0 ${title3Animation}% 0 0)`,
              }}
            >
              We build cool stuff with our CEO,
            </div>
          </AbsoluteFill>
        </Transition>
      </Sequence> */}
    </AbsoluteFill>
  );
};
