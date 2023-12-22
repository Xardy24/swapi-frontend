import React from "react";

const CharacterCard = ({ character }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{character.name}</h3>
      <p>Birth Year: {character.birth_year}</p>
      <p>Gender: {character.gender}</p>
      <p>Height: {character.height}</p>
      <p>Mass: {character.mass}</p>
    </div>
  );
};

export default CharacterCard;
