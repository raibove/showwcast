import {
  AbsoluteFill,
  interpolate,
  spring,
  useVideoConfig,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Lobster";
import React from "react";
const { fontFamily } = loadFont();

interface StatsProps {
  name: string;
  value: number;
}

export const UserStats: React.FC<{
  stats: StatsProps[];
}> = ({ stats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const driver = spring({
    frame: frame - 42,
    fps,
    config: {
      damping: 60,
      overshootClamping: true,
    },
  });

  const getCurrentValue = (endValue: number) =>
    Math.ceil(
      interpolate(driver, [0, 1], [0, endValue], {
        extrapolateRight: "clamp",
      })
    );

    const Stat = ({children}: {children: React.ReactNode})=>{
        return (
            <span style={{color: 'black'}}>{children}</span>
        )
    }
    
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F0BB",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        fontSize: "90px",
        color: "orange",
        padding: "80px 50px",
        textAlign: "center",
        fontFamily: fontFamily,
      }}
    >
      <p>I have <Stat>{getCurrentValue(stats[0].value)}</Stat> followers</p>
      <p>
        Collaborated with <Stat>{getCurrentValue(stats[1].value)}</Stat> community members
      </p>
      <p>
        Wrote <Stat>{getCurrentValue(stats[2].value)}</Stat> threads and published{" "}
        <Stat>{getCurrentValue(stats[3].value)}</Stat> show.{" "}
      </p>
    </AbsoluteFill>
  );
};
