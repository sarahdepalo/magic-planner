import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/homepage/HomePage";
import ParkSelector from "./components/parkSelector/ParkSelector";
import Attractions from "./components/attractions/Attractions";
import Dining from "./components/dining/Dining";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/parks" element={<ParkSelector/>} />
          <Route path="/attractions/:parkName" element={<Attractions/>}/>
          <Route path="/dining/:parkName" element={<Dining/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
