import React, { useState, useEffect } from 'react';
import { usePeople } from '../hooks';
import Emoji from './Emoji';
import Loading from './Loading';

import './style/Characters.css';

const Characters = () => {
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentCharacter, setCurrentCharacter] = useState({});
  const { people, nextPage, isLoading } = usePeople(pageNumber);

  function updateCurrentCharacter() {
    setCurrentCharacter(people[count]);
  }

  function handleClick(e) {
    if (e.target.id === 'leftBtn') {
      setCount(count - 1);
    }
    if (e.target.id === 'rightBtn') {
      setCount(count + 1);
    }
  }

  const handleNextPage = () => {
    setCount(0);
    setPageNumber(pageNumber + 1);
    updateCurrentCharacter();
  };

  useEffect(() => {
    if (people) {
      updateCurrentCharacter();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, people]);

  return (
    <div className="Characters__container">
      <div>
        <button
          id="leftBtn"
          className="btn btn-primary"
          disabled={count === 0}
          onClick={handleClick}
        >
          <Emoji symbol="⬅" /> Previous Character
        </button>
        <div className="Characters__container-text">
          {isLoading ? <Loading /> : <h1>{currentCharacter?.name}</h1>}
        </div>
        <button
          id="rightBtn"
          className="btn btn-primary"
          disabled={count === people?.length - 1}
          onClick={handleClick}
        >
          Next Character <Emoji symbol="➡" />
        </button>
      </div>
      <div>
        <button
          className="btn btn-success btn-lg btn-block"
          onClick={handleNextPage}
          disabled={nextPage === null}
        >
          Get more characters <Emoji symbol="➕" />
        </button>
      </div>
    </div>
  );
};
export default Characters;
