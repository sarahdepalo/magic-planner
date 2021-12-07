import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

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

  return (
    <>
    <main>
        <section>
        <h1>{parkName} Attractions</h1>
            {!!attractions ? attractions.map((attraction) => (
                <Card 
                attraction={attraction}
                handleClick={handleClick}
                key={`${attraction.activity_name}`}
                />
            )): (<p>Loading Attractions...</p>)}
        </section>
    </main>
    </>
  );
};

export default Activities;
