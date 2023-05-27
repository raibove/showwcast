import { Sequence, Audio } from "remotion";
import React from "react";
import { WebTechnologies } from "./WebTechnologies";
import { UserProfile } from "./UserProfile";
import { UserInfo } from "./UserInfo";
import { UserAbout } from "./UserAbout";
import { Transition } from "../company/Transition";
import userAudio from "../../../../src/assets/user-audio.mp3";
import { UserStats } from "./UserStats";

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
}> = ({ title, src, about, headline, location, activity, techStack, stats }) => {
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
      <Sequence from={550}>
        <Transition>
          <UserStats stats={stats}/>
        </Transition>
      </Sequence>
      <Audio src={userAudio} />
    </>
  );
};
