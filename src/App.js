import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";
import CharacterCard from "./components/CharacterCard";
import "./App.css";

const PersonInfoComponent = () => {
  const [name, setName] = useState("");
  const [personInfo, setPersonInfo] = useState(null);
  const [characterList, setCharacterList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 2;

  const fetchPersonInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/swapi-proxy/person-info?name=${name}`
      );
      setPersonInfo(response.data);
    } catch (error) {
      console.error("Error fetching person information:", error);
      setPersonInfo(null);
    }
  };

  const fetchCharacterList = async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/people/");
      setCharacterList(response.data.results);
    } catch (error) {
      console.error("Error fetching character list:", error);
      setCharacterList([]);
    }
  };

  useEffect(() => {
    fetchCharacterList();
  }, []);

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characterList.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>SWAPI App</h1>
      <div className="form-container">
        <label>
          Enter person name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button onClick={fetchPersonInfo}>Fetch Person Info</button>
      </div>

      {personInfo && (
        <div>
          <h2>{personInfo.name}</h2>
          <p>Birth Year: {personInfo.birthYear}</p>
          <p>Gender: {personInfo.gender}</p>
          <p>Planet: {personInfo.planetName}</p>
          <p>Fastest Vehicle Driven: {personInfo.fastestVehicleDriven}</p>
          <p>Height: {personInfo.height}</p>
          <p>Mass: {personInfo.mass}</p>

          <h3>Films:</h3>
          <ul>
            {personInfo.films.map((film, index) => (
              <li key={index}>
                <strong>Name:</strong> {film.name},{" "}
                <strong>Release Date:</strong> {film.releaseDate}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2>Character List</h2>
        {currentCharacters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}

        <Pagination
          charactersPerPage={charactersPerPage}
          totalCharacters={characterList.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default PersonInfoComponent;
