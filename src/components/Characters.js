import React, { useState, useEffect } from "react";

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
          console.log(data.results);
        });
      setExecuted(true);
    }
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
    setPrevCharacter(characters[count - 1]);
    setCurrentCharacter(characters[count]);
    setNextCharacter(characters[count + 1]);
  }, [count]);

  return (
    <div>
      <button id="leftBtn" disabled={count === 0} onClick={e => handleClick(e)}>
        Previous Character
      </button>
      <div>
        <h3>{currentCharacter ? currentCharacter.name : ""}</h3>
      </div>
      <button
        id="rightBtn"
        disabled={count === characters.length - 1}
        onClick={e => handleClick(e)}
      >
        Next Character
      </button>
    </div>
  );
};
export default Characters;
