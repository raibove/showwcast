import { AbsoluteFill } from "remotion";
import React from "react";

export const UserAbout: React.FC<{
  about: string;
}> = ({ about }) => {


  return (
    <AbsoluteFill
      style={{
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
