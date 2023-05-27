import { NavLink } from "react-router-dom";
import "./Menu.css";

export const Menu = () => {
  return (
    <nav>
      <ul className="menu-list">
        <li className="menu-item">
          <NavLink  to="/" className={({ isActive, isPending }) =>
    isPending ? "menu-link" : isActive ? "active-link" : "menu-link"
  } >
            <span>🏠 Home</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/user" className={({ isActive, isPending }) =>
    isPending ? "menu-link" : isActive ? "active-link" : "menu-link"
  } >
            <span>🤖 User</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/company" className={({ isActive, isPending }) =>
    isPending ? "menu-link" : isActive ? "active-link" : "menu-link"
  } >
            <span>🏢 Company</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
