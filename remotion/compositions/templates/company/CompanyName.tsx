import React, { useEffect } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  Sequence,
} from "remotion";

export const CompanyName: React.FC<{
  name: string;
  logo: string;
  oneliner: string;
}> = ({ name, logo, oneliner = "Its a beautiful day" }) => {
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
    frame: frame - 40,
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
    config: {},
  });

  const translateUpProgress = spring({
    frame: frame - 130,
    fps,
    config: {},
  });

  const translateUp = interpolate(translateUpProgress, [0, 1], [0, -width / 5]);

  const scaleDownProgress = spring({
    fps,
    frame: frame - 130,
    config: {},
  });

  const scaleDown = interpolate(scaleDownProgress, [0, 1], [1, 0.7]);

  const delay = (durationInFrames - 10) / oneliner.length;

  // Calculate the index of the current character to display
  const index = Math.min(Math.floor(frame / delay), oneliner.length);
  const textShown = oneliner.slice(0, index);

  return (
    <AbsoluteFill>
    <AbsoluteFill
      style={{
        transform: `translateY(${translateUp}px) scale(${scaleDown})`,
      }}
    >
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              fontSize: 120,
              color: "black",
              transform: `scale(${interpolate(
                nameInitialScale,
                [0, 1],
                [1, 1.5]
              )})`,
              fontWeight: 500,
            }}
          >
            {name}
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>
      
    </AbsoluteFill>
    <Sequence from={150}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            color: "black"
            
          }}
        >
          <div
            style={{
              fontFamily: "MonoSans",
              fontSize: 80,
            }}
          >
            {textShown}
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
