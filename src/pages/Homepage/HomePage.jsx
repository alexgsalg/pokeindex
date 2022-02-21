import React, { useState, useEffect } from "react";
// import { useInView } from 'react-intersection-observer';
import pokeServices from "../../services/PokeServices";
import "./style.scss";

import PokeIndex from "../../assets/imgs/Pokeindex-logo.png";
import UltraBall from "../../assets/imgs/UltraBallPokemon.png";
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
      const pokeData = pokeServices.pokeStats(pokemon);
      if (!pokeList.find((item) => item.id === pokeData.id)) {
        setPokeList((pokeList) => [...pokeList, pokeData]);
      }
      if (pok === 80)  {
        setIsLoaded(true);
      }
      if (pok === 151) {
        setMysteryPokemon(pokeList.find((random) => random.id === pokeNumber));
      }
    }
    
    return isLoaded;
  };

  useEffect(() => {
    fetchThemAll();
    return [ pokeList, mysteryPokemon, isLoaded ];
    // eslint-disable-next-line
  }, []);

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
          <img src={PokeIndex} className="loading_name" alt="Pokemon" />
          <img src={UltraBall} className="loading_pokeball" alt="UltraBall" />
          
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

      <div className="pokedex_header">
        <h1 className="pokedex_header__title">Pokedex Gen 1</h1>
        <button
          className="pokedex_header__btn"
          disabled={pokeList.length !== 151}
          onClick={() => {
            randomPokemon();
          }}
        >
          Who is this pokemon ?
        </button>
      </div>


      <div className="card_grid" >
        {pokeList.map((pokemon) => (
          <PokeCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
    </main>
  );
}

export default HomePage;
