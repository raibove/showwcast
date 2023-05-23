import React from "react";
import {
  AbsoluteFill
} from "remotion";
import {CompanyName} from "./CompanyName"

export const CompanyIntro: React.FC<{
  name: string;
  logo: string;
  oneliner: string;
}> = ({ name, logo, oneliner }) => {

  return (
    <AbsoluteFill style={{ backgroundColor: "#D4E0FF" }}>
      <CompanyName name={name} logo={logo} oneliner={oneliner}/>
    </AbsoluteFill>
  );
};
