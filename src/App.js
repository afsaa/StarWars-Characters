import React from "react";
import "./App.css";
import Characters from "./components/Characters";
import Header from "./components/Header";
function App() {
  return (
    <React.Fragment>
      <Header />
      <Characters />
    </React.Fragment>
  );
}

export default App;
