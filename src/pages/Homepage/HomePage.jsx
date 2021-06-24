import React, { useState, useEffect } from "react";
import "./style.css";

function HomePage() {
  const [pokeList, setPokeList] = useState([]);
  const [mysteryModal, setMysteryModal] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [whoIsIt, setWhoIsIt] = useState(false);
  const pokeNumber = Math.floor(Math.random() * 150) + 1;
  const howMany = 150;

  const [mysteryPokemon, setMysteryPokemon] = useState(
    pokeList.find((random) => random.id === Math.floor(Math.random() * 150) + 1)
  );

  const togglewhoIsIt = () => {
    setWhoIsIt(!whoIsIt);
  };

  useEffect(() => {
    const fetchThemAll = async () => {
      for (let pok = 1; pok <= howMany; pok++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pok}`;
        const response = await fetch(url);
        const pokemon = await response.json();
        if (!pokeList.find((item) => item.id === pokemon.id)) {
          setPokeList((pokeList) => [...pokeList, pokemon]);
        }
      }
    };
    fetchThemAll();
    setMysteryPokemon(pokeList[pokeNumber]);
    randomPokemon();
    return pokeList;
  }, []);

  const randomPokemon = () => {
    setMysteryPokemon(pokeList.find((random) => random.id === pokeNumber));
    console.log(mysteryPokemon);
    setMysteryModal(true);
    return mysteryPokemon;
  };
  return (
    <main>
      {/* {mysteryModal ? <div className="modal">{mysteryPokemon.name}</div> : null} */}
      <button
        onClick={() => {
          randomPokemon();
        }}
      >
        Who is this pokemon
      </button>

      {pokeList.map((pokemon) => (
        <div>
          <div className="card_header">
            <p>{pokemon.name}</p>
            <span>N°{pokemon.id}</span>
          </div>
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            width="150"
          />
          {pokemon.stats.map((status) => (
            <div>
              <p>{status.stat.name}</p>
              <p>{status.base_stat}</p>
            </div>
          ))}
          {pokemon.types.map((item) => (
            <ul>
              <li>{item.type.name}</li>
            </ul>
          ))}
        </div>
      ))}
    </main>
  );
}

export default HomePage;
