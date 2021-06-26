import React, { useState, useEffect } from "react";
import "./style.css";

import PokeIndex from "../../assets/imgs/Pokeindex-logo.png";
import WhoIsThis from "../../components/WhoIsThis/WhoIsThis";

function HomePage() {
  const [pokeList, setPokeList] = useState([]);
  const [mysteryModal, setMysteryModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const pokeNumber = Math.floor(Math.random() * 150) + 1;
  const howMany = 151;
  const [mysteryPokemon, setMysteryPokemon] = useState(
    pokeList.find((random) => random.id === Math.floor(Math.random() * 150) + 1)
  );

  const fetchThemAll = async () => {
    for (let pok = 1; pok <= howMany; pok++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pok}`;
      const response = await fetch(url);
      const pokemon = await response.json();
      if (!pokeList.find((item) => item.id === pokemon.id)) {
        setPokeList((pokeList) => [...pokeList, pokemon]);
      }
      if (pok === 151) {
        setMysteryPokemon(pokeList.find((random) => random.id === pokeNumber));
      }
    }
    setIsLoaded(true);
    return isLoaded;
  };

  useEffect(() => {
    fetchThemAll();
    return pokeList, mysteryPokemon, isLoaded;
  }, []);

  const randomPokemon = () => {
    setMysteryPokemon(pokeList.find((random) => random.id === pokeNumber));
    console.log(mysteryPokemon);
    setMysteryModal(true);
    return mysteryPokemon;
  };
  return (
    <main>
      {/* Loading */}
      {!isLoaded ? (
        <div className="loading">
          <img src={PokeIndex} alt="Pokemon" />
        </div>
      ) : null}
      {/* Who is this Pokemon */}
      {mysteryModal ? (
        <WhoIsThis
          mysteryPokemon={mysteryPokemon}
          mysteryModal={mysteryModal}
          setMysteryModal={setMysteryModal}
          randomPokemon={randomPokemon}
        />
      ) : null}
      <button
        onClick={() => {
          randomPokemon();
        }}
      >
        Who is this pokemon
      </button>

      <div className="card_grid">
        {pokeList.map((pokemon) => (
          <div key={pokemon.id} className="card">
            <div className="card_header">
              <span>N°{pokemon.id}</span>
              <p>
                {pokemon.name.includes("-")
                  ? pokemon.name.slice(0, -2)
                  : pokemon.name}
              </p>

              <img
                src={pokemon.sprites.other.dream_world.front_default}
                width="150"
              />
            </div>
            <div className="card_body">
              {pokemon.stats.map((status) => (
                <div key={status.stat.name}>
                  <p>{status.stat.name}</p>
                  <p>{status.base_stat}</p>
                </div>
              ))}
              <ul>
                {pokemon.types.map((item) => (
                  <li key={item.type.name}>{item.type.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default HomePage;
