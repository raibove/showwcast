import "./Header.css"
import Logo from "../../assets/owl.svg"
import { Link } from "react-router-dom";

const Header = ()=>{
    return(
        <div className="header">
        <Link to="/" className="header-link">
            <div className="header-logo">
            <img src={Logo} alt="logo" className="logo"/>
            <h1 className="header-title">Showwcast</h1>
            </div>
        </Link>
        </div>

    )
}

export default Header;