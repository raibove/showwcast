import { useState, FormEvent, KeyboardEvent, useEffect } from "react";
import "./User.css";
import axios from "axios";
import { Player } from "@remotion/player";
import { CompanyIntro } from "../remotion/compositions/templates/company/CompanyIntro";
import owl from "./assets/owl.svg";
import copy from "./assets/copy.svg";
import { Instruction } from "../remotion/compositions/instruction/Instruction";
import { Error } from "../remotion/compositions/error/Error";

interface SocialProp{
  value: string;
}

interface CompanyProps {
  name: string;
  logo: string;
  oneLiner: string;
  location: string;
  teamSize: string;
  teamType: string;
  url: string;
  socials: string[];
  slug: string;
}

const Company = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyInfo, setCompanyInfo] = useState<CompanyProps | null>(null);
  const [showCopyUrl, setShowCopyUrl] = useState(false);
  const [showError, setShowError] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateCompanyName = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCompanyName(e.currentTarget.value);
  };

  const formatCompanyName = (newCompanyName: string) => {
    const currentCompanyName = newCompanyName.toLowerCase();
    const companyArr = currentCompanyName.split(" ");
    return companyArr.join("-");
  };

  const getCompany = async (newCompanyName = companyName) => {
    const formatedCompanyName = formatCompanyName(newCompanyName);

    try {
      const res = await axios.get(
        `https://cache.showwcase.com/companies/${formatedCompanyName}`
      );

      const socials: string[] = []
      
      res.data.socials && res.data.socials.forEach((social: SocialProp)=>{
        socials.push(social.value)
      })

      const newCompanyInfo = {
        name: res.data.name || "Company",
        logo: res.data.logoUrl || owl,
        oneLiner: res.data.oneLiner || "A company you would like to be in",
        location: res.data.location || "World",
        teamSize: res.data.size?.value || 10,
        teamType: res.data.size?.label || "Growing Team",
        url: res.data.url || "https://www.showwcase.com",
        socials: socials,
        slug: res.data.slug ||companyName,
      };

      setCompanyInfo(newCompanyInfo);
      setShowCopyUrl(true);
      setShowError(false);
    } catch (err) {
      setCompanyInfo(null);
      setShowError(true);
      setShowCopyUrl(false);
    }
  };

  const handleKeypress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getCompany();
    }
  };

  const instructions = [
    {
      id: 0,
      title: "To create a video of a company from the template",
    },
    {
      id: 1,
      title: "Enter the company name from the showwcase profile",
    },
    { id: 2, title: "and click on submit" },
    {
      id: 3,
      title:
        "Now you have a video and a URL which you can share with the community.",
    },
  ];

  const copyURLWithQueryParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    if(companyInfo!=null)
    queryParams.set("name", companyInfo.slug);

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
      setCompanyName(nameParam);
      setShowCopyUrl(true);
      getCompany(nameParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSocials = ()=>{
    const socials: string[] = []
   
    if(companyInfo && companyInfo.url){
      socials.push(companyInfo.url)
    }

    if(companyInfo && companyInfo.socials){
      companyInfo.socials.forEach((social)=>{
        socials.push(social)
      })
    }

    return socials;
  }

  return (
    <div className="container">
      <div className="player">
        {showCopyUrl === true && companyInfo !== null && (
          <div
            style={{
              position: "relative",
            }}
          >
            <Player
              controls
              component={CompanyIntro}
              inputProps={{
                name: companyInfo.name,
                logo: companyInfo.logo,
                oneliner: companyInfo.oneLiner,
                location: companyInfo.location,
                teamSize: companyInfo.teamSize,
                teamType: companyInfo.teamType,
                socials: getSocials()
              }}
              durationInFrames={1080}
              compositionWidth={1800}
              compositionHeight={1080}
              fps={30}
              style={{
                width: "100%",
              }}
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
                error: "company name",
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
        <h3 className="title">Company Name</h3>
        <input
          className="input"
          value={companyName}
          onChange={updateCompanyName}
          onKeyDown={handleKeypress}
        />
        <button className="submit" onClick={() => getCompany()}>
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
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Company;
