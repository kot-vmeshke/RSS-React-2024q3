import { NavLink } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">React Forms</h1>
      <nav>
        <ul className="header__nav-list">
          <li className="header__nav-list-item">
            <NavLink to="/" className="header__nav-link">
              Home
            </NavLink>
          </li>
          <li className="header__nav-list-item">
            <NavLink to="/controlled" className="header__nav-link">
              Controlled form
            </NavLink>
          </li>
          <li className="header__nav-list-item">
            <NavLink to="/uncontrolled" className="header__nav-link">
              Uncontrolled form
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
