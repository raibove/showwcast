import { Composition } from "remotion";
import { PortfolioComposition } from "./compositions/templates/portfolio/Portfolio.composition";
import React from "react";
 
export const MyVideo = () => {
  return (
    <>
      <Composition
        component={PortfolioComposition}
        durationInFrames={120}
        width={1920}
        height={1080}
        fps={30}
        id="my-comp"
        defaultProps={{ text: "World" }}
      />
    </>
  );
};