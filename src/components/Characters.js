import React, { useState, useEffect } from "react";

import "./style/Characters.css";

const Characters = props => {
  let URL = `https://swapi.co/api/people/`;
  const [executed, setExecuted] = useState(false);
  const [count, setCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [prevCharacter, setPrevCharacter] = useState({});
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [nextCharacter, setNextCharacter] = useState({});
  const [nextPage, setNextPage] = useState("");

  function getData() {
    if (!executed) {
      if (nextPage !== "") {
        URL = nextPage;
        setCount(0);
      }
      fetch(URL)
        .then(function(response) {
          return response.json();
        })
        .then(data => {
          setCharacters(data.results);
          setNextPage(data.next);
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
  }, [count, characters, executed]);

  return (
    <div className="Characters__container">
      <div>
        <button
          id="leftBtn"
          className="btn btn-primary"
          disabled={count === 0}
          onClick={e => handleClick(e)}
        >
          <span role="img" aria-label="left-arrow">
            ⬅
          </span>{" "}
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
          Next Character{" "}
          <span role="img" aria-label="right-arrow">
            ➡
          </span>
        </button>
      </div>
      <div>
        <button
          className="btn btn-success btn-lg btn-block"
          onClick={() => setExecuted(false)}
        >
          Get more characters{" "}
          <span role="img" aria-label="plus">
            ➕
          </span>
        </button>
      </div>
    </div>
  );
};
export default Characters;
