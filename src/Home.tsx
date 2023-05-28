import { Player } from "@remotion/player";
import { Intro } from "../remotion/compositions/intro/Intro";
import "./index.css";

export const Home = () => {
  return (
    <div
      className="home-player"
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
