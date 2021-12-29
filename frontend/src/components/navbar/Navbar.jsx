import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LoginButton from "../userAuth/LoginButton";
import LogoutButton from "../userAuth/LogoutButton";
import logo from "./images/magicPlannerLogo.png";
import "./navbar.scss";

const Navbar = () => {
  const [active, setIsActive] = useState(false);
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <nav>
        <Link to="/">
          <img src={logo} alt="Magic Planner" className="logo" />
        </Link>
        <FontAwesomeIcon
          icon={faBars}
          className="menu"
          onClick={() => setIsActive(!active)}
          size="lg"
        />
        <div className={!!active ? "navbar-links active" : "navbar-links"}>
          <ul>
            <li>
              <Link to="/parks">Parks</Link>
            </li>
            <li>Itinerary</li>
            <li className="login">
              {isAuthenticated ? (
                <LogoutButton/>
              ) : (
                <LoginButton/>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
