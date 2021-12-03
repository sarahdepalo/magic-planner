import { useEffect, useState } from "react";
import "./parkSelector.scss";

const ParkSelector = () => {
  const [parks, setParks] = useState(null);
  useEffect(() => {
    const getParks = async () => {
      const url = `http://localhost:5000/parks`;
      const response = await fetch(url).then((response) => response.json());
      setParks(response);
    };

    getParks();
  }, []);

  return (
    <>
      <main>
        {!!parks ? (
          <section className="park-selection">
            {parks.map((park) => (
              <div key={`${park.id}-${park.park_name}`} className="park">
                <div className="image-container">
                  <img src={`http://localhost:5000/images/parks/${park.park_image}`} alt={`${park.park_name}`}/>
                </div>
                <h2>{park.park_name}</h2>
                <p>{park.park_description}</p>
                <button className="btn btn-primary">Select Park</button>
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
