import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/homepage/HomePage";
import ParkSelector from "./components/parkSelector/ParkSelector";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/parks" element={<ParkSelector/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
