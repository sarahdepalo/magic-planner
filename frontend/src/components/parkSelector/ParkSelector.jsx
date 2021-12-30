import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../userAuth/LoginButton";
import "./parkSelector.scss";

const ParkSelector = () => {
  const { isAuthenticated } = useAuth0();

  const [parks, setParks] = useState(null);

  const { user } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    const getParks = async () => {
      const url = `http://localhost:5000/parks`;
      const response = await fetch(url).then((response) => response.json());
      setParks(response);
    };

    getParks();
  }, []);

  const selectPark = async (event, parkId, parkName) => {
    event.preventDefault();

    const userId = user.sub.slice(6);

    const localUrl = "http://localhost:5000/parks/add";
    const response = await fetch(localUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        parkId: parkId,
      }),
    }).then((response) => response.json());

    navigate(`/attractions/${parkName}`);
  };

  return (
    <>
      <main>
        {!!parks ? (
          <section className="park-selection">
            {parks.map((park) => (
              <div key={`${park.id}-${park.park_name}`} className="park">
                <div className="image-container">
                  <img
                    src={`http://localhost:5000/images/parks/${park.park_image}`}
                    alt={`${park.park_name}`}
                  />
                </div>
                <h2>{park.park_name}</h2>
                <p>{park.park_description}</p>
                {isAuthenticated ? (
                  <button
                    className="btn btn-primary"
                    onClick={(event) =>
                      selectPark(event, park.id, park.park_name)
                    }
                  >
                    Select Park
                  </button>
                ) : (
                  <div className="btn-container">
                    <button className="btn disabled" disabled>
                      Select Park
                    </button>
                    <LoginButton btnTxt={"Sign in to select a park"} />
                  </div>
                )}
              </div>
            ))}
          </section>
        ) : (
          <p>Loading parks...</p>
        )}
      </main>
    </>
  );
};

export default ParkSelector;
