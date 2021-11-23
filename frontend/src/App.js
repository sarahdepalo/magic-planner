import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/homepage/HomePage";
import LoginButton from "./components/userAuth/LoginButton";
import LogoutButton from "./components/userAuth/LogoutButton";
import UserProfile from "./components/userProfile/UserProfile";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
        </Routes>
      </Router>

      <LoginButton />
      <LogoutButton />
      <UserProfile />
    </>
  );
}

export default App;
