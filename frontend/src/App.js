import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import UserProfile from "./components/UserProfile";
import './App.css';

function App() {
  return (
    <div className="App">
     <LoginButton/>
     <LogoutButton/>
     <UserProfile/>
    </div>
  );
}

export default App;
