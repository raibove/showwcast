import "./Header.css"
import Logo from "../../assets/owl.svg"
const Header = ()=>{
    return(
        <div className="header">
            <img src={Logo} alt="logo" className="logo"/>
            <h1 className="header-title">Showwcast</h1>
        </div>
    )
}

export default Header;