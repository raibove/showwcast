import "./NotFound.css";
import { Player } from '@lottiefiles/react-lottie-player';
import lamp from "../../assets/lamp.json";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()

  return (
    <div className="not-found">
       <Player
        src= {lamp}
        className="not-found-lamp"
        loop
        autoplay
      />
      <h2 className="not-found-title">Error: Page Not Found</h2>
      <h3 className="not-found-subtitle">Lost into Darkness??? See how others take the spotlight.</h3>
      <button className="not-found-button" onClick={()=> navigate("./")}>Take me home</button>
    </div>
  );
};

export default NotFound;
