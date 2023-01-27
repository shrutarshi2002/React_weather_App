import React from "react";
import "./App.css";
import Forecast from "./components/Forecast/Forecast";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./components/Logo/Logo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Weather App</h1>
        <Logo />
        <br />
        <Forecast />
      </header>
      <div></div>
      <main></main>
      <footer>Page created by Arvinte Alexandru</footer>
    </div>
  );
}

export default App;
