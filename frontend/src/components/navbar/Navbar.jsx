import { Link } from "react-router-dom";
import LoginButton from "../userAuth/LoginButton";
import logo from "./images/magicPlannerLogo.png";
import "./navbar.scss";

const Navbar = () => {
  return (
    <>
      <nav>
        <Link to="/">
          <img src={logo} alt="Magic Planner" className="logo" />
        </Link>
        <ul>
          <li>Parks</li>
          <li>Itinerary</li>
          <li className="login">
            <LoginButton />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
