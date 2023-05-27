import { Player } from "@remotion/player";
import { Intro } from "../remotion/compositions/intro/Intro";

export const Home = () => {
  return (
    <div
      style={{
        position: "relative",
        margin: "60px auto",
        width: "65vw",
      }}
    >
      <Player
        component={Intro}
        compositionWidth={1800}
        compositionHeight={1000}
        fps={30}
        style={{
          width: "100%",
        }}
        controls
        durationInFrames={480}
      />
    </div>
  );
};
