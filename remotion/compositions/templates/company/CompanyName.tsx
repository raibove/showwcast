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

export const CompanyName: React.FC<{
  name: string;
  logo: string;
  oneliner: string;
}> = ({ name, logo, oneliner = "A company you would like to be in" }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const logoTranslationProgress = spring({
    frame: frame - 50,
    fps,
    config: {
      damping: 100,
    },
  });

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

  const textAnimate = spring({
    fps,
    frame: frame - 150,
    config: { damping: 250 },
  });

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
          <div
            style={{
              transform: `translateX(${logoTranslation}px) scale(${interpolate(
                logoScale,
                [0, 1],
                [1, 0.5]
              )}) `,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Img
              src={logo}
              style={{ width: "620px", height: "650px", borderRadius: "50%" }}
            />
          </div>
          <Sequence from={70}>
            <AbsoluteFill
              style={{
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  transform: `scale(${interpolate(
                    nameInitialScale,
                    [0, 1],
                    [0.5, 1]
                  )})`,
                }}
              >
                <p
                  style={{
                    float: "right",
                    width: "70%",
                    fontWeight: 500,
                    fontFamily: "MonaSans",
                    color: "black",
                    fontSize: 180,
                  }}
                >
                  {name}
                </p>
              </div>
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
            textAlign: "center",
            color: "black",
            fontFamily: "MonoSans",
            fontSize: 80,
            transform: `scale(${textAnimate})`,
          }}
        >
          {oneliner}
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
