import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "./Card";
import "./attractions.scss";

const Activities = () => {
  // Create a next button for going to dining for park and a view itinerary button to skip dining (both at the top and bottom of the page)
  const [attractions, setAttractions] = useState(null);
  const [userChoices, setUserChoices] = useState([]);

  const { user } = useAuth0();
  const { parkName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getAttractions = async () => {
      const url = `http://localhost:5000/activities/${parkName}`;
      const response = await fetch(url).then((response) => response.json());
      setAttractions(response);
      console.log(response);
    };

    getAttractions();
  }, []);

  const handleClick = (event, id) => {
    event.preventDefault();
    let index;
    if (userChoices.includes(id)) {
      index = userChoices.indexOf(id);
      let newArray = [...userChoices];
      newArray.splice(index, 1);
      setUserChoices(newArray);
    } else {
      setUserChoices([...userChoices, id]);
    }
    console.log(userChoices);
  };

  const next = async (event) => {
    event.preventDefault();
    const userId = user.sub.slice(6);

    const localUrl = "http://localhost:5000/activities/add";
    const response = await fetch(localUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        array: userChoices,
      }),
    }).then((response) => response.json());

    navigate(`/dining/${parkName}`);
  };

  return (
    <>
      <main>
        <section className="attraction-selection">
          <h1>{parkName} Attractions</h1>
          <p>
            We've gathered all of the attractions of {parkName}. Pick and choose
            activities to add to your itinerary.
          </p>
          <button type="button" className="btn btn-primary" onClick={(event) => next(event)}>Move to Dining</button>
          {!!attractions ? (
            attractions.map((attraction) => (
              <Card
                attraction={attraction}
                handleClick={handleClick}
                key={`${attraction.activity_name}`}
              />
            ))
          ) : (
            <p>Loading Attractions...</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Activities;
