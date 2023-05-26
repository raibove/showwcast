import { Link } from "react-router-dom";
import "./Menu.css";

export const Menu = () => {
  return (
    <nav>
      <ul className="menu-list">
        <Link to="/" className="header-link">
          <li className="menu-item">
            <span>🏠 Home</span>
          </li>
        </Link>
        <Link to="/user" className="header-link">
            <li className="menu-item">
                <span>🤖 User</span>
            </li>
        </Link>
        <Link to="/company" className="header-link">
            <li className="menu-item">
                <span>🏢 Company</span>
            </li>
        </Link>
      </ul>
    </nav>
  );
};
