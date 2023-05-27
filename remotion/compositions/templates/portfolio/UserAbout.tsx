import { AbsoluteFill } from "remotion";
import React from "react";
import ReactMarkdown from "react-markdown";



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
        <ReactMarkdown
        children={about}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      />
      </p>
    </AbsoluteFill>
  );
};
