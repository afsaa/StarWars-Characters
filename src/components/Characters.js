import React, { useState, useEffect } from "react";
import Emoji from "./Emoji";
import Loading from "./Loading";

import "./style/Characters.css";

const Characters = (props) => {
  let BASE_URL = `https://swapi.dev/api/people/`;
  const [executed, setExecuted] = useState(false);
  const [count, setCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [nextPage, setNextPage] = useState("");
  const [loading, setLoading] = useState(false);

  function getData() {
    if (!executed) {
      setLoading(true);
      if (nextPage !== "") {
        BASE_URL = nextPage.replace("http", "https");
        setCount(0);
      }
      fetch(BASE_URL, {
        method: "GET",
        mode: "cors",
        redirect: "follow",
      })
        .then(function (response) {
          return response.json();
        })
        .then((data) => {
          setCharacters(data.results);
          setNextPage(data.next);
          setLoading(false);
        });
      updateCharacters();
      setExecuted(true);
    }
  }

  function updateCharacters() {
    setCurrentCharacter(characters[count]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, characters, executed]);

  return (
    <div className="Characters__container">
      <div>
        <button
          id="leftBtn"
          className="btn btn-primary"
          disabled={count === 0}
          onClick={(e) => handleClick(e)}
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
          onClick={(e) => handleClick(e)}
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
