import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  AbsoluteFill,
} from "remotion";

interface Technology {
  name: string;
  color?: string;
  iconUrl?: string;
}

export const WebTechnologies: React.FC<{ technology: Technology[] }> = ({
  technology,
}) => {
  const config = useVideoConfig();
  const frame = useCurrentFrame();

  const getChunks = () => {
    const halfIndex = Math.ceil(technology.length / 3);
    const firstHalf = technology.slice(0, halfIndex);
    const secondHalf = technology.slice(halfIndex, halfIndex * 2);
    const thirdHalf = technology.slice(halfIndex * 2 + 1);
    return [firstHalf, secondHalf, thirdHalf];
  };

  const chunks = getChunks();

  return (
    <AbsoluteFill
      style={{
        // backgroundColor: "#B98B82",
        backgroundColor: 'rgb(226 228 221)'
      }}
    >
      <p
        style={{
          fontSize: "4.5em",
          fontFamily: 'Roboto',
          color: "black",
          textAlign: "center",
          padding: 0,
          marginBottom: 0,
        }}
      >
        Tech Stacks I use
      </p>
      <div
        style={{
          flex: 1,
          padding: "0 100px",
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            height: "100%",
          }}
        >
          {chunks.map((ch) => {
            return (
              <div style={{ flex: 1 }}>
                {ch.map((t, i) => {
                  const pos = spring({
                    fps: config.fps,
                    frame: frame - i * 2,
                    config: {
                      stiffness: 100,
                      mass: 0.5,
                      damping: 50,
                    },
                  });
                  return (
                    <div
                      style={{
                        transform: `translateY(${interpolate(
                          pos,
                          [0, 1],
                          [200, 0]
                        )}px)`,
                        opacity: pos,
                        textAlign: "center",
                        padding: 25,
                      }}
                    >
                      <Img
                        src={t.iconUrl}
                        style={{ width: 160, height: 160 }}
                      />
                    </div>
                    //   <div
                    //     style={{
                    //       color: 'red',
                    //       transform: `translateY(${interpolate(
                    //         pos,
                    //         [0, 1],
                    //         [200, 0]
                    //       )}px)`,
                    //       opacity: pos,
                    //       fontSize: '6em',
                    //       lineHeight: "1.5em",
                    //       fontFamily: "Cursive",
                    //       textAlign:'center'
                    //       }}
                    //   >
                    //     {t.name}
                    //   </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
