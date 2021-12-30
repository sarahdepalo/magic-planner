import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Card = ({ props, handleClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <div>
        <h3>{props.dining_name}</h3>
        <img
          src={`http://localhost:5000/images/dining/${props.dining_image}`}
          alt={props.dining_name}
        />
        <p>{props.dining_price}</p>
        <p>{props.dining_type}</p>
        <button
          className={
            !!isClicked ? "btn btn-primary clicked" : "btn btn-primary"
          }
          onClick={(event) => {
            handleClick(event, props.id);
            setIsClicked(!isClicked);
          }}
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
