import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "./Card";
import "./dining.scss";

const Dining = () => {
    const [restaurants, setRestaurants] = useState(null);
    const [userChoices, setUserChoices] = useState([]);

    const {user} = useAuth0();
    const {parkName} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getDining = async () => {
            const url = `http://localhost:5000/dining/${parkName}`;
            const response = await fetch(url).then((response) => response.json());
            setRestaurants(response);
            console.log(response)
        }
        getDining();
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

    return (
        <>
        <main>
        <h2>{parkName} Dining</h2>
        <section>
            {!!restaurants ? (
                restaurants.map((restaurant) => (
                    <Card
                    props={restaurant}
                    handleClick={handleClick}
                    key={`${restaurant.id}-${restaurant.dining_name}`}
                    />
                ))
            ): <p>Loading restaurants</p>}
        </section>
        </main>
        </>
    )
}

export default Dining;