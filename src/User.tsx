import { useState, FormEvent, KeyboardEvent } from "react";
import "./User.css";
import axios from "axios";
import { Player } from "@remotion/player";
import { Portfolio } from "../remotion/compositions/templates/portfolio/Portfolio";
import copy from "./assets/copy.svg";

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
    } catch (err) {
      console.log(err);
      setShowCopyUrl(false);
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
    }
  };

  const handleKeypress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getUser();
    }
  };

  const generateUrl = ()=>{
    console.log("url")
  }

  return (
    <div className="container">
      <div className="player">
        {userInfo !== null && (
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
