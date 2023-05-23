import { useState, FormEvent } from "react";
import "./User.css";
import axios from "axios";
import { Player } from "@remotion/player";
import { CompanyIntro } from "../remotion/compositions/templates/company/CompanyIntro";

interface CompanyProps {
  name: string;
  logo: string;
  oneLiner: string;
}


const Company = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyInfo, setCompanyInfo] = useState<CompanyProps | null>(null);

  const updateCompanyName = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCompanyName(e.currentTarget.value);
  };

  const getCompany = async () => {
    try {
      const res = await axios.get(
        `https://cache.showwcase.com/companies/${companyName}`
      );
      console.log(res);
      setCompanyInfo(res.data);
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
                oneliner: companyInfo.oneLiner
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
