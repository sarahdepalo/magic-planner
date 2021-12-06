import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Activities = () => {
  const [attractions, setAttractions] = useState(null)
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

  return (
    <>
    <main>
        <section>
        <h1>{parkName} Attractions</h1>
            {!!attractions ? attractions.map((attraction) => (
                <div>
                    <h3>{attraction.activity_name}</h3>
                </div>
            )): (<p>Loading Attractions...</p>)}
        </section>
    </main>
    </>
  );
};

export default Activities;
