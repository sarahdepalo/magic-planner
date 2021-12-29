import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/homepage/HomePage";
import ParkSelector from "./components/parkSelector/ParkSelector";
import Attractions from "./components/attractions/Attractions";
import Dining from "./components/dining/Dining";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/parks" element={<ParkSelector/>} />
          <Route path="/attractions/:parkName" element={isAuthenticated ? <Attractions/> : <Navigate to="/"/>}/>
          <Route path="/dining/:parkName" element={isAuthenticated ? <Dining/> : <Navigate to="/"/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
