import { useState, FormEvent, KeyboardEvent, useEffect } from "react";
import "./User.css";
import axios from "axios";
import { Player } from "@remotion/player";
import { Portfolio } from "../remotion/compositions/templates/portfolio/Portfolio";
import copy from "./assets/copy.svg";
import { Instruction } from "../remotion/compositions/instruction/Instruction";
import { Error } from "../remotion/compositions/error/Error";
import owl from "./assets/owl.svg";

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
  totalFollowers: number;
  totalWorkedWiths: number;
  totalThreads: number;
  engagement: {totalPublishedShows: number;};
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

interface SocialProp {
  value: string;
}

const User = () => {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState<UserProps | null>(null);
  const [userStack, setUserStack] = useState<StackProps[]>([]);
  const [userSocials, setUserSocials] = useState<SocialProp[]>([])
  const [showCopyUrl, setShowCopyUrl] = useState(false);
  const [showError, setShowError] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateUsername = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUsername(e.currentTarget.value);
  };

  const getSocials = async (newUsername: string)=>{
    try{
      const res = await axios.get(
        `https://cache.showwcase.com/user/${newUsername}/socials`
      );
      setUserSocials(res.data.links);
    }catch(err){
      console.log(err)
    }
  }

  const getStacks = async (newUsername: string) => {
    try {
      const res = await axios.get(
        `https://cache.showwcase.com/user/${newUsername}/stacks`
      );
      setUserStack(res.data);
      setShowCopyUrl(true);
      setShowError(false);
    } catch (err) {
      setShowCopyUrl(false);
      setShowError(true);
    }
  };

  const getUser = async (newUsername = username) => {
    try {
      const res = await axios.get(
        `https://cache.showwcase.com/user/${newUsername}`
      );

      const newUserInfo = {
        displayName: res.data.name || "User",
        about: "A curious person",
        profilePictureUrl: res.data.profilePictureUrl || owl,
        location: res.data.location || "World",
        activity: res.data.activity || {
          emoji: "",
          message: "Developing"
        },
        headline: res.data.headline || "Human",
        totalFollowers: res.data.totalFollowers || 0,
        totalWorkedWiths: res.data.totalWorkedWiths || 0,
        totalThreads: res.data.totalThreads || 0,
        engagement: res.data.engagement || {
          totalPublishedShows: 0
        }
      }

      setUserInfo(newUserInfo);
      getStacks(newUsername);
      getSocials(newUsername);
    } catch (err) {
      setUserInfo(null);
      setShowError(true);
      setShowCopyUrl(false)
    }
  };

  const handleKeypress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getUser();
    }
  };

  const copyURLWithQueryParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("name", username);

    const modifiedURL = `${window.location.origin}${
      window.location.pathname
    }?${queryParams.toString()}`;
    navigator.clipboard.writeText(modifiedURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const nameParam = queryParams.get("name");

    if (nameParam) {
      setUsername(nameParam);
      setShowCopyUrl(true);
      getUser(nameParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const instructions = [
    {
      id: 0,
      title: "To create a video of your user-profile",
    },
    {
      id: 1,
      title: "Enter the username name from the showwcase profile",
    },
    { id: 2, title: "and click on submit" },
    {
      id: 3,
      title:
        "Now you have a video and a URL which you can share with the community.",
    },
  ];

  const getUserStats = ()=>{
    const stats = []
    if(userInfo){
    stats.push({
      name: 'followers',
      value: userInfo.totalFollowers | 0
    })

    stats.push({
      name:'collaborated',
      value: userInfo.totalWorkedWiths | 0
    })

    stats.push({
      name: 'threads',
      value: userInfo.totalThreads | 0
    })

    stats.push({
      name: 'shows',
      value: userInfo.engagement?.totalPublishedShows | 0
    })
  }

    return stats;
  }

  const getUserSocials = ()=>{
    const newUserSocials = []

    newUserSocials.push( `https://www.showwcase.com/${username}`)
    userSocials.forEach((socialLink)=>{
      newUserSocials.push(socialLink.value)
    });

    return newUserSocials
  }

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
                stats: getUserStats(),
                socials: getUserSocials()
              }}
              durationInFrames={970}
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
        {!showCopyUrl && !showError && (
          <div
            style={{
              position: "relative",
            }}
          >
            <Player
              component={Instruction}
              inputProps={{
                instructions: instructions,
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
          </div>
        )}
        {!showCopyUrl && showError && (
          <div
            style={{
              position: "relative",
            }}
          >
            <Player
              component={Error}
              inputProps={{
                error: "user name",
              }}
              durationInFrames={400}
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
        <input
          className="input"
          value={username}
          onChange={updateUsername}
          onKeyDown={handleKeypress}
        />
        <button className="submit" onClick={() => getUser()}>
          Submit
        </button>
        {showCopyUrl === true && (
          <button className="copy-url" onClick={copyURLWithQueryParams}>
            {copied ? (
              "Copied ✅"
            ) : (
              <span className="copy-url-text">
                Copy URL
                <img src={copy} alt="copy" className="copy-url-icon" />
              </span>
            )}{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
