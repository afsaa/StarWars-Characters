import React, { useState, useEffect } from "react";

import "./style/Characters.css";

const Characters = props => {
  const URL = `https://swapi.co/api/people/`;
  const [executed, setExecuted] = useState(false);
  const [count, setCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [prevCharacter, setPrevCharacter] = useState({});
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [nextCharacter, setNextCharacter] = useState({});

  function getData() {
    if (!executed) {
      fetch(URL)
        .then(function(response) {
          return response.json();
        })
        .then(data => {
          setCharacters(data.results);
        });
      updateCharacters();
      setExecuted(true);
    }
  }

  function updateCharacters() {
    setPrevCharacter(characters[count - 1]);
    setCurrentCharacter(characters[count]);
    setNextCharacter(characters[count + 1]);
  }

  function handleClick(e) {
    if (e.target.id === "leftBtn") {
      setCount(count - 1);
    }
    if (e.target.id === "rightBtn") {
      setCount(count + 1);
    }
  }

  useEffect(() => {
    getData();
    updateCharacters();
  }, [count, characters]);

  return (
    <div
      className="Characters__container"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <button
        id="leftBtn"
        className="btn btn-primary"
        disabled={count === 0}
        onClick={e => handleClick(e)}
      >
        Previous Character
      </button>
      <div className="Characters__container-text">
        <h3>{currentCharacter ? currentCharacter.name : ""}</h3>
      </div>
      <button
        id="rightBtn"
        className="btn btn-primary"
        disabled={count === characters.length - 1}
        onClick={e => handleClick(e)}
      >
        Next Character
      </button>
    </div>
  );
};
export default Characters;
