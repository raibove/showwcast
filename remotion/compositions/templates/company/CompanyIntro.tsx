import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { CompanyName } from "./CompanyName";
import { CompanyMoreInfo } from "./CompanyMoreInfo";
import { Transition } from "./Transition";

export const CompanyIntro: React.FC<{
  name: string;
  logo: string;
  oneliner: string;
  location: string;
}> = ({ name, logo, oneliner, location }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#D4E0FF" }}>
      <CompanyName name={name} logo={logo} oneliner={oneliner} />
      <Sequence from={270}>
        <Transition>
          <CompanyMoreInfo location={location}/>
        </Transition>
      </Sequence>
    </AbsoluteFill>
  );
};
