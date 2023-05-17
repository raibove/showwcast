import {
  AbsoluteFill,
  Sequence,
  Img,
  interpolate,
  useCurrentFrame,
} from "remotion";
import React from "react";
import MapPin from "../../../../src/assets/map-pin.svg"
import {WebTechnologies} from "./WebTechnologies"

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
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [30, 60], [0, 1]);
  const overlayOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateRight: "clamp",
  });

  const slideProgress = interpolate(
		frame,
		[180, 220],
		[-100, 0],
		{
			extrapolateRight: 'clamp',
		}
	);


  return (
    <>
      <Sequence from={0} durationInFrames={550} name="Event image">
        <AbsoluteFill
          style={{
            overflow: "hidden",
            backgroundColor: "#F5F0BB",
          }}
        >
          <Img
            src={src}
            style={{
              position: "absolute",
              borderRadius: 30,
              left: "10%",
              top: "20%",
              height: "50%",
              transform: `scale(${scale})`,
              filter: "drop-shadow(0px 0px 15px #000000)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "50%",
              right: "5%",
              top: "20%",
            }}
          >
            <p
              style={{
                fontSize: "5.5em",
                textAlign: "center",
                color: "#191716",
                fontFamily: "Cursive",
                fontWeight: "bold",
                opacity: titleOpacity,
              }}
            >
              Hi,
              <br />
              I'm {title}
            </p>
          </div>
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            opacity: overlayOpacity,
            backgroundColor: "rgba(255,119,61, .9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            textAlign: "center",
            padding: '10% 0'
          }}
        >
            <p style={{
               fontSize: "4em",
               textAlign: "center",
               fontFamily: 'cursive',
            }}>
              I'm a {headline}</p>
            <div style={{display:'flex'}}>
            <Img style={{ width:'15%'}} src={MapPin}/>
            <p
            style={{
              fontSize: "4.2em",
              textAlign: "center",
              fontFamily: 'cursive'
           }}
            > Located in {location}</p>
            </div>
            <p
            style={{
              fontSize: "4.2em",
              textAlign: "center",
              fontFamily: 'cursive'
           }}
            >Activity: {activity.emoji} {activity.message}</p>
        </AbsoluteFill>
        <AbsoluteFill
          style={{
					transform: `translateY(${slideProgress}%)`,
          backgroundColor: "#3D348B",
          }}
        >
          
          <p
            style={{
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "7",
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "4.5em",
              textAlign: "center",
              color: "white",
              fontFamily: "Roboto",
            }}
          >
            <span style={{ fontFamily: "Cursive" }}>About me</span>
            <br />
            {about}
          </p>
        </AbsoluteFill>
        <Sequence from={350} >
          <WebTechnologies/>
        </Sequence>
      </Sequence>
    </>
  );
};

