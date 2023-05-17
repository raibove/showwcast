import { Sequence } from "remotion";
import React from "react";
import { WebTechnologies } from "./WebTechnologies";
import { UserProfile } from "./UserProfile";
import { UserInfo } from "./UserInfo";
import { AboutUser } from "./AboutUser";

// CFFFB3
// FCEC52
// CA907E

interface ActivityProps {
  emoji: string;
  message: string;
}

export const Portfolio: React.FC<{
  backgroundImg?: string;
  title: string;
  about: string;
  src?: string;
  fontFamily?: string;
  headline?: string;
  location?: string;
  activity: ActivityProps;
}> = ({ title, src, about, headline, location, activity }) => {
  return (
    <>
      <Sequence from={0} durationInFrames={550} name="Event image">
        <UserProfile title={title} src={src} />
        <UserInfo location={location} headline={headline} activity={activity} />
        <AboutUser about={about} />
        <Sequence from={350}>
          <WebTechnologies />
        </Sequence>
      </Sequence>
    </>
  );
};
