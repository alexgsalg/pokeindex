import React, { useState, useEffect } from "react";
import "./style.scss";

import PokeIndex from "../../assets/imgs/Pokeindex-logo.png";
import WhoIsThis from "../../components/WhoIsThis/WhoIsThis";
import PokeCard from '../../components/PokeCard/PokeCard';

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
      const pokeData = pokeStats(pokemon);
      console.log('pokemon',pokeData)
      if (!pokeList.find((item) => item.id === pokeData.id)) {
        setPokeList((pokeList) => [...pokeList, pokeData]);
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

  const pokeStats = (pk) => {
    let pkTypes = [];
    let pkStats = [];

    pk.types.map((t,index) => { 
      pkTypes.push({
        id: index,
        name: t.type.name
      })
    });

    pk.stats.map(i => {
      pkStats.push({
        name: i.stat.name,
        data: i.base_stat
      })
    });
    return {
      id: pk.id,
      name: pk.name,
      primaryType: pkTypes[0].name,
      types: pkTypes,
      image: pk.sprites.other.dream_world.front_default,
      stats: pkStats
    }
  } 

  const randomPokemon = () => {
    setMysteryPokemon(pokeList.find((random) => random.id === pokeNumber));
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
          <PokeCard pokemon={pokemon} />
        ))}
      </div>
    </main>
  );
}

export default HomePage;
