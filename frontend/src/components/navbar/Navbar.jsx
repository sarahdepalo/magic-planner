import { Link } from "react-router-dom";
import logo from "./images/magicPlannerLogo.png";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src={logo} alt="Magic Planner" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
