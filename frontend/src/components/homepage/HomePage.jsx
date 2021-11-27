import { Link } from "react-router-dom";
import LoginButton from "../userAuth/LoginButton";
import LogoutButton from "../userAuth/LogoutButton";
import UserProfile from "../userProfile/UserProfile";
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
        <section className="introduction">
          <div className="container">
            <LoginButton />
            <LogoutButton />
            <UserProfile />
          </div>
        </section>
      </main>
    </>
  );
};

export default Homepage;
