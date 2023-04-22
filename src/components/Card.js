import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const StarWarsCard = ({ name, height, mass, birthYear, gender }) => {
  return (
    <Card bg="white" text="dark" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title
          className="mb-4 text-center"
          style={{ fontFamily: 'Days One', fontSize: '1.5rem' }}
        >
          {name}
        </Card.Title>
        <Card.Subtitle className="mb-3" style={{ fontSize: '1.25rem' }}>
          <strong>Height:</strong> {height}
        </Card.Subtitle>
        <Card.Subtitle className="mb-3" style={{ fontSize: '1.25rem' }}>
          <strong>Mass:</strong> {mass}
        </Card.Subtitle>
        <Card.Subtitle className="mb-3" style={{ fontSize: '1.25rem' }}>
          <strong>Birth Year:</strong> {birthYear}
        </Card.Subtitle>
        <Card.Subtitle style={{ fontSize: '1.25rem' }}>
          <strong>Gender:</strong> {gender}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

StarWarsCard.propTypes = {
  name: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mass: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  birthYear: PropTypes.string,
  gender: PropTypes.string,
};

export default StarWarsCard;
