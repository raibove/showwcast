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

interface CommunityProps {
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

const Community = () => {
  const [communityname, setCommunityname] = useState("");
  const [communityInfo, setCommunityInfo] = useState<CommunityProps | null>(null);
  const [communityStack, setCommunityStack] = useState<StackProps[]>([]);
  const [communitySocials, setCommunitySocials] = useState<SocialProp[]>([])
  const [showCopyUrl, setShowCopyUrl] = useState(false);
  const [showError, setShowError] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateCommunityname = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCommunityname(e.currentTarget.value);
  };

  const getSocials = async (newCommunityname: string)=>{
    try{
      const res = await axios.get(
        `https://cache.showwcase.com/community/${newCommunityname}/socials`
      );
      setCommunitySocials(res.data.links);
    }catch(err){
      console.log(err)
    }
  }

  const getStacks = async (newCommunityname: string) => {
    try {
      const res = await axios.get(
        `https://cache.showwcase.com/community/${newCommunityname}/stacks`
      );
      setCommunityStack(res.data);
      setShowCopyUrl(true);
      setShowError(false);
    } catch (err) {
      setShowCopyUrl(false);
      setShowError(true);
    }
  };

  
  const formatCommunityname = (newCommunityname: string) => {
    const currentCompanyName = newCommunityname.toLowerCase();
    const companyArr = currentCompanyName.split(" ");
    return companyArr.join("-");
  };

  const getCommunity = async (newCommunityname = communityname) => {
    try {

      const formatedCommunityname = formatCommunityname(newCommunityname);

      const res = await axios.get(
        `https://cache.showwcase.com/community/${formatedCommunityname}`
      );

      const newCommunityInfo = {
        displayName: res.data.name || "Community",
        about: "To discuss together",
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

      setCommunityInfo(newCommunityInfo);
      getStacks(newCommunityname);
      getSocials(newCommunityname);
    } catch (err) {
      setCommunityInfo(null);
      setShowError(true);
      setShowCopyUrl(false)
    }
  };

  const handleKeypress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getCommunity();
    }
  };

  const copyURLWithQueryParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("name", communityname);

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
      setCommunityname(nameParam);
      setShowCopyUrl(true);
      getCommunity(nameParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const instructions = [
    {
      id: 0,
      title: "To create a video of your community-profile",
    },
    {
      id: 1,
      title: "Enter the community name from the showwcase profile",
    },
    { id: 2, title: "and click on submit" },
    {
      id: 3,
      title:
        "Now you have a video and a URL which you can share with the community.",
    },
  ];

  const getCommunityStats = ()=>{
    const stats = []
    if(communityInfo){
    stats.push({
      name: 'followers',
      value: communityInfo.totalFollowers | 0
    })

    stats.push({
      name:'collaborated',
      value: communityInfo.totalWorkedWiths | 0
    })

    stats.push({
      name: 'threads',
      value: communityInfo.totalThreads | 0
    })

    stats.push({
      name: 'shows',
      value: communityInfo.engagement?.totalPublishedShows | 0
    })
  }

    return stats;
  }

  const getCommunitySocials = ()=>{
    const newCommunitySocials = []

    newCommunitySocials.push( `https://www.showwcase.com/${communityname}`)
    communitySocials.forEach((socialLink)=>{
      newCommunitySocials.push(socialLink.value)
    });

    return newCommunitySocials
  }

  return (
    <div className="container">
      <div className="player">
        {showCopyUrl === true && communityInfo !== null && (
          <div
            style={{
              position: "relative",
            }}
          >
            <Player
              component={Portfolio}
              inputProps={{
                title: communityInfo.displayName,
                src: communityInfo.profilePictureUrl,
                about: communityInfo.about,
                location: communityInfo.location,
                activity: communityInfo.activity,
                headline: communityInfo.headline,
                techStack: communityStack,
                stats: getCommunityStats(),
                socials: getCommunitySocials()
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
                error: "community name",
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
        <h3 className="title">Community name</h3>
        <input
          className="input"
          value={communityname}
          onChange={updateCommunityname}
          onKeyDown={handleKeypress}
        />
        <button className="submit" onClick={() => getCommunity()}>
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

export default Community;
