import { Link } from "react-router-dom";
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
                <div>
                  <h3>Attractions</h3>
                  <p>
                    With over 115 attractions to choose from, you're sure to
                    plan a fun filled day packed with memories.
                  </p>
                </div>
              </div>
              <h3>Attractions</h3>
            </div>
            <div className="hover-container">
              <div className="hover-content">
                <div>
                  <h3>Dining</h3>
                  <p>
                    We organized all the restaurants in Disney World based on
                    parks so you don't have to worry about where you'll eat each
                    day.
                  </p>
                </div>
              </div>
              <h3>Dining</h3>
            </div>
            <div className="hover-container">
              <div className="hover-content">
                <div>
                  <h3>Lodging</h3>
                  <p>
                    Don't have your hotel picked out yet? No worries, we've
                    gathered the hotels closest to each park and listed
                    available transportation to minimize your travel stresses
                    each morning.
                  </p>
                </div>
              </div>
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
                <h2>
                  Make Memories That <br />
                  Last a Lifetime
                </h2>
                <p>
                  Our goal is to take the stress out of your vacation planning
                  so you can focus less on planning and more on making memories.
                  Whether you're a seasoned park goer or a Disney newbie, Magic
                  Planner is here to help.
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
