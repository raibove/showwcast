import {
  AbsoluteFill,
  Sequence,
  Img,
  spring,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";
// CFFFB3
// FCEC52
// CA907E

export const Portfolio: React.FC<{
  backgroundImg?: string;
  title: string;
  about: string;
  src?: string;
  fontFamily?: string;
}> = ({ title, src, about }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [30, 60], [0, 1]);
  const overlayOpacity = interpolate(frame, [80, 130], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      <Sequence from={0} durationInFrames={380} name="Event image">
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
        <AbsoluteFill
          style={{
            opacity: overlayOpacity,
            backgroundColor: "#FF773D",
            width: "100%",
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
      </Sequence>
    </>
  );
};
