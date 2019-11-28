import React, { useState, useEffect } from "react";

const Characters = props => {
  const [count, setCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [prevCharacter, setPrevCharacter] = useState({});
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [NextCharacter, setNextCharacter] = useState({});

  function handleClick(e) {
    if (e.target.id === "leftBtn") {
      setPrevCharacter(characters[count - 1]);
      setCurrentCharacter(characters[count]);
      setNextCharacter(characters[count + 1]);
      setCount(count - 1);
    }
    if (e.target.id === "rightBtn") {
      setPrevCharacter(characters[count - 1]);
      setCurrentCharacter(characters[count]);
      setNextCharacter(characters[count + 1]);
      setCount(count + 1);
    }
  }
  useEffect(() => {
    fetch(`https://swapi.co/api/people/`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        setCharacters(data.results);
        console.log(data.results);
      });
  }, [count]);

  return (
    <div>
      <button id="leftBtn" onClick={e => handleClick(e)}>
        Previous Character
      </button>
      <div>
        <h3>{currentCharacter ? currentCharacter.name : ""}</h3>
      </div>
      <button id="rightBtn" onClick={e => handleClick(e)}>
        Next Character
      </button>
    </div>
  );
};
export default Characters;
