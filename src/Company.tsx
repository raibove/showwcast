import { useState, FormEvent, KeyboardEvent } from "react";
import "./User.css";
import axios from "axios";
import { Player } from "@remotion/player";
import { CompanyIntro } from "../remotion/compositions/templates/company/CompanyIntro";
import owl from "./assets/owl.svg";
import copy from "./assets/copy.svg";

interface CompanyProps {
  name: string;
  logo: string;
  oneLiner: string;
  location: string;
  teamSize: string;
  teamType: string;
}

const Company = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyInfo, setCompanyInfo] = useState<CompanyProps | null>(null);
  const [showCopyUrl, setShowCopyUrl] = useState(false);

  const updateCompanyName = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCompanyName(e.currentTarget.value);
    setShowCopyUrl(false);
  };

  const formatCompanyName = () => {
    const newCompanyName = companyName.toLowerCase();
    const companyArr = newCompanyName.split(" ");
    return companyArr.join("-");
  };

  const getCompany = async () => {
    const formatedCompanyName = formatCompanyName();

    try {
      const res = await axios.get(
        `https://cache.showwcase.com/companies/${formatedCompanyName}`
      );

      const newCompanyInfo = {
        name: res.data.name || "Company",
        logo: res.data.logo || owl,
        oneLiner: res.data.oneLiner || "A company you would like to be in",
        location: res.data.location || "World",
        teamSize: res.data.size?.value || 10,
        teamType: res.data.size?.label || "Growing Team",
      };

      setCompanyInfo(newCompanyInfo);
      setShowCopyUrl(true);
    } catch (err) {
      setCompanyInfo(null);
      setShowCopyUrl(false);
    }
  };

  const handleKeypress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getCompany();
    }
  };

  return (
    <div className="container">
      <div className="player">
        {companyInfo !== null && (
          <div
            style={{
              position: "relative",
            }}
          >
            <Player
              controls
              loop
              component={CompanyIntro}
              inputProps={{
                name: companyInfo.name,
                logo: companyInfo.logo,
                oneliner: companyInfo.oneLiner,
                location: companyInfo.location,
                teamSize: companyInfo.teamSize,
                teamType: companyInfo.teamType,
              }}
              durationInFrames={880}
              compositionWidth={1800}
              compositionHeight={1080}
              fps={30}
              style={{
                width: "100%",
              }}
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
        <button className="submit" onClick={getCompany}>
          Submit
        </button>
        {showCopyUrl === true && (
          <button className="copy-url" onClick={getCompany}>
            Copy URL
            <img src={copy} alt="copy" className="copy-url-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Company;
