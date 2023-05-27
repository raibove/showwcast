import { AbsoluteFill } from "remotion";
import React from "react";
import ReactMarkdown from "react-markdown";



export const UserAbout: React.FC<{
  about: string;
}> = ({ about }) => {


  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#99A98F",
      }}
    >
      <p
        style={{
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "9",
          display: "-webkit-box",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "48px",
          textAlign: "center",
          color: "white",
          fontFamily: "Roboto",
        }}
      >
        <span style={{ fontFamily: "Cursive" }}>About me</span>
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
