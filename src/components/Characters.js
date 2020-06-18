import React, { useState, useEffect } from "react";
import Emoji from "./Emoji";
import Loading from "./Loading";

import "./style/Characters.css";

const Characters = props => {
  let URL = `https://swapi.dev/api/people/`;
  const [executed, setExecuted] = useState(false);
  const [count, setCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [prevCharacter, setPrevCharacter] = useState({});
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [nextCharacter, setNextCharacter] = useState({});
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(false);

  function getData() {
    if (!executed) {
      setLoading(true);
      if (nextPage !== "") {
        URL = nextPage;
        setCount(0);
      }
      fetch(URL, {
        method: 'GET', 
	      mode: 'cors',
	      redirect: 'follow'
      })
        .then(function(response) {
          return response.json();
        })
        .then(data => {
          setCharacters(data.results);
          setNextPage(data.next);
          setLoading(false);
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
          <Emoji symbol="⬅" /> Previous Character
        </button>
        <div className="Characters__container-text">
          {loading ? <Loading /> : <h1>{currentCharacter.name}</h1>}
        </div>
        <button
          id="rightBtn"
          className="btn btn-primary"
          disabled={count === characters.length - 1}
          onClick={e => handleClick(e)}
        >
          Next Character <Emoji symbol="➡" />
        </button>
      </div>
      <div>
        <button
          className="btn btn-success btn-lg btn-block"
          onClick={() => setExecuted(false)}
        >
          Get more characters <Emoji symbol="➕" />
        </button>
      </div>
    </div>
  );
};
export default Characters;
