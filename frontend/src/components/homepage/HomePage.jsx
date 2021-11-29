import { Link } from "react-router-dom";
import LoginButton from "../userAuth/LoginButton";
import LogoutButton from "../userAuth/LogoutButton";
import UserProfile from "../userProfile/UserProfile";
import { ReactComponent as Wave } from "./wave.svg";
import castle from "./images/castle.jpeg";
import "./homepage.scss";

const Homepage = () => {
  return (
    <>
      <main>
        <header className="hero-container">
          <img src={castle} className="hero-img" alt="disney world castle" />
          <span className="circle pink"></span>
          <div className="text-container">
            <h1>Plan Your Perfect Vacation</h1>
            <p>
              Magic Planner makes it easy to plan out all aspects of your Disney
              World vacation. From lodging down to individual attractions, we've
              got 'em all. Start planning now!
            </p>
            <Link to="/" className="btn btn-primary">
              Get Started
            </Link>
          </div>
          <span className="circle blue"></span>
        </header>
        <Wave />
        <section className="introduction">
          <div className="container">
            <div>
              <h3>Attractions</h3>
            </div>
            <div>
              <h3>Dining</h3>
            </div>
            <div>
              <h3>Lodging</h3>
            </div>
          </div>
        </section>
        <section>
          <LoginButton />
          <LogoutButton />
          <UserProfile />
        </section>
      </main>
    </>
  );
};

export default Homepage;
