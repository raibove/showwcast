import { useState, FormEvent } from "react";
import "./User.css";
import axios from "axios";
import { Player } from "@remotion/player";
import { CompanyIntro } from "../remotion/compositions/templates/company/CompanyIntro";
import owl from "./assets/owl.svg"

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

  const updateCompanyName = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCompanyName(e.currentTarget.value);
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
      console.log(newCompanyInfo);
      setCompanyInfo(newCompanyInfo);
    } catch (err) {
      setCompanyInfo(null);
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
        />
        <br />
        <br />
        <button className="submit" onClick={getCompany}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Company;
