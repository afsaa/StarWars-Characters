import React from "react";
import "./App.css";
import Characters from "./components/Characters";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <React.Fragment>
      <Header />
      <Characters />
      <Footer />
    </React.Fragment>
  );
}

export default App;
