import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import React from "react";
import MapPin from "../../../../src/assets/map-pin.svg";

interface ActivityProps {
  emoji: string;
  message: string;
}

export const UserInfo: React.FC<{
  headline?: string;
  location?: string;
  activity: ActivityProps;
}> = ({ activity, headline, location }) => {
  const frame = useCurrentFrame();
  const overlayOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: overlayOpacity,
        backgroundColor: "rgba(255,119,61, .9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        textAlign: "center",
        padding: "10% 0",
      }}
    >
      <p
        style={{
          fontSize: "4em",
          textAlign: "center",
          fontFamily: "cursive",
        }}
      >
        I'm a {headline}
      </p>
      <div style={{ display: "flex" }}>
        <Img style={{ width: "15%" }} src={MapPin} />
        <p
          style={{
            fontSize: "4.2em",
            textAlign: "center",
            fontFamily: "cursive",
          }}
        >
          {" "}
          Located in {location}
        </p>
      </div>
      <p
        style={{
          fontSize: "4.2em",
          textAlign: "center",
          fontFamily: "cursive",
        }}
      >
        Activity: {activity.emoji} {activity.message}
      </p>
    </AbsoluteFill>
  );
};
