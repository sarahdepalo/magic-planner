import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const Card = ({ attraction, handleClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <div>
        <h3>{attraction.activity_name}</h3>
        <img
          src={`http://localhost:5000/images/activities/${attraction.activity_image}`}
          alt={`${attraction.activity_name}`}
        />
        <p>{attraction.activity_type}</p>
        <p>{attraction.activity_height}</p>
        <p>{attraction.activity_hours}</p>
        <p>{attraction.activity_description}</p>
        <button
          className={!!isClicked ? "btn btn-primary clicked" : "btn btn-primary"}
          onClick={(event) => {handleClick(event, attraction.id); setIsClicked(!isClicked)}}
        >
          <FontAwesomeIcon
          icon={faCheck}
          size="sm"
          className={!!isClicked ? "check" : "hidden"}
          />
          {!isClicked ? "Add to Itinerary" : "Added"}
        </button>
      </div>
    </>
  );
};

export default Card;
