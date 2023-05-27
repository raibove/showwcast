import { Sequence, Audio, AbsoluteFill, Img } from "remotion";
import React from "react";
import { WebTechnologies } from "./WebTechnologies";
import { UserProfile } from "./UserProfile";
import { UserInfo } from "./UserInfo";
import { UserAbout } from "./UserAbout";
import { Transition } from "../company/Transition";
import userAudio from "../../../../src/assets/user-audio.mp3";
import { UserStats } from "./UserStats";
import { CompanySocial } from "../company/CompanySocial";

// CFFFB3
// FCEC52
// CA907E

interface ActivityProps {
  emoji: string;
  message: string;
}

interface StackDetailProps {
  id: number;
  name: string;
  iconUrl: string;
}

interface StackProps {
  id: number;
  stack: StackDetailProps;
}

interface StatsProps {
  name: string;
  value: number;
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
  techStack?: StackProps[];
  stats: StatsProps[];
  socials: string[];
}> = ({
  title,
  src,
  about,
  headline,
  location,
  activity,
  techStack,
  stats,
  socials
}) => {
  const getTechnology = () => {
    if (techStack === undefined) {
      return [];
    }

    const technology = techStack.map((item) => ({
      name: item.stack.name,
      iconUrl: item.stack.iconUrl,
    }));
    return technology;
  };

  return (
    <>
      <AbsoluteFill
        style={{
          backgroundColor: "#F5F0BB",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          src="https://showwcase-companies-logos.s3.amazonaws.com/showwcase_1649326857208.png"
          style={{ height: "470px", width: "450px", borderRadius: "50%" }}
        />
      </AbsoluteFill>
      <Sequence from={2}>
        <UserProfile title={title} src={src} />
        <UserInfo location={location} headline={headline} activity={activity} />
        <Sequence from={200}>
          <Transition>
            <UserAbout about={about} />
          </Transition>
        </Sequence>
        <Sequence from={400}>
          <WebTechnologies technology={getTechnology()} />
        </Sequence>
        <Sequence from={500}>
          <Transition>
            <UserStats stats={stats} />
          </Transition>
        </Sequence>
        <Sequence from={600}>
          <CompanySocial socials={socials} />
        </Sequence>
      </Sequence>
      <Audio src={userAudio} />
    </>
  );
};
