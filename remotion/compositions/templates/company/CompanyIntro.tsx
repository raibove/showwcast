import React from "react";
import { AbsoluteFill, Sequence, Audio } from "remotion";
import { CompanyName } from "./CompanyName";
import { CompanyMoreInfo } from "./CompanyMoreInfo";
import { Transition } from "./Transition";
import companyAudio from "../../../../src/assets/company-audio.mp3";

export const CompanyIntro: React.FC<{
  name: string;
  logo: string;
  oneliner: string;
  location: string;
  teamSize: string;
  teamType: string;
}> = ({ name, logo, oneliner, location, teamSize, teamType }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#D4E0FF" }}>
      <CompanyName name={name} logo={logo} oneliner={oneliner}/>
      <Sequence from={255}>
        <Transition>
          <CompanyMoreInfo location={location} teamSize={teamSize} teamType={teamType}/>
        </Transition>
      </Sequence>
      <Audio src={companyAudio} />
    </AbsoluteFill>
  );
};
