import { useState, FormEvent, KeyboardEvent } from "react";
import "./User.css";
import axios from "axios";
import { Player } from "@remotion/player";
import { Portfolio } from "../remotion/compositions/templates/portfolio/Portfolio";
import copy from "./assets/copy.svg";
import {Instruction} from "../remotion/compositions/instruction/Instruction"
import {Error} from "../remotion/compositions/error/Error";

interface ActivityProps {
  emoji: string;
  message: string;
}

interface UserProps {
  displayName: string;
  about: string;
  profilePictureUrl: string;
  location?: string;
  activity: ActivityProps;
  headline?: string;
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

const User = () => {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState<UserProps | null>(null);
  const [userStack, setUserStack] = useState<StackProps[]>([]);
  const [showCopyUrl, setShowCopyUrl] = useState(false);
  const [showError, setShowError] = useState(false);

  const updateUsername = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUsername(e.currentTarget.value);
    setShowCopyUrl(false);
  };

  const getStacks = async () => {
    try {
      const res = await axios.get(
        `https://cache.showwcase.com/user/${username}/stacks`
      );
      console.log(res);
      setUserStack(res.data);
      setShowCopyUrl(true);
      setShowError(false);
    } catch (err) {
      console.log(err);
      setShowCopyUrl(false);
      setShowError(true);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(
        `https://cache.showwcase.com/user/${username}`
      );
      console.log(res);
      setUserInfo(res.data);
      getStacks();

    } catch (err) {
      setUserInfo(null);
      setShowError(true)
    }
  };

  const handleKeypress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getUser();
    }
  };

  const generateUrl = () => {
    console.log("url")
  }

  const instructions = [{
    id: 0,
    title: "To create a video of your user-profile"
}
    , {
    id: 1, title:
        "Enter the username name from the showwcase profile"
},
{ id: 2, title: "and click on submit" },
{
    id: 3, title:
        "Now you have a video and a URL which you can share with the community."
}];

  return (
    <div className="container">
      <div className="player">
        {showCopyUrl === true && userInfo !== null && (
          <div
            style={{
              position: "relative",
            }}
          >
            <Player
              component={Portfolio}
              inputProps={{
                title: userInfo.displayName,
                src: userInfo.profilePictureUrl,
                about: userInfo.about,
                location: userInfo.location,
                activity: userInfo.activity,
                headline: userInfo.headline,
                techStack: userStack,
              }}
              durationInFrames={680}
              compositionWidth={1800}
              compositionHeight={1080}
              fps={30}
              style={{
                width: "100%",
              }}
              controls
            />
          </div>
        )}
        {!showCopyUrl  && !showError && <div
            style={{
              position: "relative",
            }}
          >
            <Player
              component={Instruction}
              inputProps={{
                instructions: instructions
              }}
              durationInFrames={800}
              compositionWidth={1800}
              compositionHeight={1080}
              fps={30}
              style={{
                width: "100%",
              }}
              controls
            />
          </div>}
          {!showCopyUrl && showError && <div
            style={{
              position: "relative",
            }}
          >
            <Player
              component={Error}
              inputProps={{
                error: "user name"
              }}
              durationInFrames={200}
              compositionWidth={1800}
              compositionHeight={1080}
              fps={30}
              style={{
                width: "100%",
              }}
              controls
            />
          </div>}
      </div>
      <div className="form">
        <h3 className="title">Username</h3>
        <input className="input" value={username} onChange={updateUsername}
          onKeyDown={handleKeypress}
        />
        <button className="submit" onClick={getUser}>
          Submit
        </button>
        {showCopyUrl === true && (
          <button className="copy-url" onClick={generateUrl}>
            Copy URL
            <img src={copy} alt="copy" className="copy-url-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
