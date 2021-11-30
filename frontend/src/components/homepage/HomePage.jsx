import { Link } from "react-router-dom";
import LoginButton from "../userAuth/LoginButton";
import LogoutButton from "../userAuth/LogoutButton";
import UserProfile from "../userProfile/UserProfile";
import { ReactComponent as Wave } from "./wave.svg";
import { ReactComponent as ReversedWave } from "./reversedWave.svg";
import castle from "./images/castle.jpeg";
import characters from "./images/characters.jpg";
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
            <div className="hover-container">
                <div className="hover-content">
                    <h3>Attractions</h3>
                    <p>I AM IN A HOVERBOX</p>
                </div>
              <h3>Attractions</h3>
            </div>
            <div className="hover-container">
              <h3>Dining</h3>
            </div>
            <div className="hover-container">
              <h3>Lodging</h3>
            </div>
          </div>
        </section>
        <ReversedWave />
        <section className="sign-up">
          <div className="col-container">
            <div className="col-1">
              <img
                src={characters}
                alt="mickey mouse and alvin the chipmunk disney characters"
              />
            </div>
            <div className="col-2">
              <span className="circle pink"></span>
              <div className="text-container">
                <h2>Make Memories That <br/>Last a Lifetime</h2>
                <p>
                  Our goal is to take the stress out of your vacation planning so you can focus less on planning and more on making memories. Whether you're a seasoned park goer or a Disney newbie, Magic Planner is here to help.
                </p>
                <Link to="/" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
              <span className="circle blue"></span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Homepage;
