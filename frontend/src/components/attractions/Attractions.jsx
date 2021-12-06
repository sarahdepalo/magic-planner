import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Activities = () => {
// Select multiple activities, on select change button to FA check. On click again, remove from activities array. When you click next -> redirect to dining for selected park or jump to itinerary -> go to created itinerary. 
  const [attractions, setAttractions] = useState(null);
  const [userChoices, setUserChoices] = useState([]);
  const { parkName } = useParams();
 
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
      let index
    if(userChoices.includes(id)) {
        index = userChoices.indexOf(id);
        let newArray = [...userChoices];
        newArray.splice(index, 1);
        setUserChoices(newArray);
    } else {
        setUserChoices([...userChoices, id])
    }
    console.log(userChoices)
  } 
  // will need to turn each attraction into it's own component so they can manage when the button is clicked and can change the class accordingly
  return (
    <>
    <main>
        <section>
        <h1>{parkName} Attractions</h1>
            {!!attractions ? attractions.map((attraction) => (
                <div key={`${attraction.activity_name}`}>
                    <h3>{attraction.activity_name}</h3>
                    <img src={`http://localhost:5000/images/activities/${attraction.activity_image}`}/>
                    <p>{attraction.activity_type}</p>
                    <p>{attraction.activity_height}</p>
                    <p>{attraction.activity_hours}</p>
                    <p>{attraction.activity_description}</p>
                    <button className="btn btn-primary" onClick={(event) => handleClick(event, attraction.id)}>Add to Itinerary</button>
                </div>
            )): (<p>Loading Attractions...</p>)}
        </section>
    </main>
    </>
  );
};

export default Activities;
