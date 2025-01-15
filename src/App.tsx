import React from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Favorites from "./components/Favorites";
import Forecast from "./components/Forecast";

const App: React.FC = () => {
  return (
    <div className="app">
      <SignUp />
      <Login />
      <Favorites />
      <Forecast />
    </div>
  );
};

export default App;
