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

export const CompanyIntro: React.FC<{
  name: string;
  logo: string;
}> = ({ name, logo }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps, width } = useVideoConfig();

  const logoTranslationProgress = spring({
    frame: frame - 50,
    fps,
    config: {
      damping: 100,
    },
  });

  // Move the logo up by 150 pixels once the transition starts
  const logoTranslation = interpolate(
    logoTranslationProgress,
    [0, 1],
    [0, -width / 3]
  );

  const logoScale = spring({
    fps,
    frame: frame - 30,
    config: {
      damping: 200,
    },
    durationInFrames: 30,
  });

  const logoInitialScale = spring({
    fps,
    frame,
    durationInFrames: 20,
    config: { damping: 500 },
  });

  const nameInitialScale = spring({
    fps,
    frame: frame - 70,
    config: {  },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#D4E0FF" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${logoInitialScale})`,
        }}
      >
        <AbsoluteFill
          style={{
            transform: `translateX(${logoTranslation}px) scale(${interpolate(
              logoScale,
              [0, 1],
              [1, 0.5]
            )}) `,
            display: 'flex',
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Img
            src={logo}
            style={{ width: "620px", height: "650px", borderRadius: "50%" }}
          />
        </AbsoluteFill>
        <Sequence from={70}>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 100,
              fontFamily: "MonaSans",
              fontSize: 130,
              color: "black",
              transform: `scale(${interpolate(
                nameInitialScale,
                [0, 1],
                [1, 1.5]
              )})`,
              fontWeight: 700,
            }}
          >
            {name}
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
