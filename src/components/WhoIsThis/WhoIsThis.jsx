import React from "react";
import "./style.css";

function WhoIsThis({ mysteryPokemon, setMysteryModal }) {
  const handleGuess = () => {};
  return (
    <div className="whoisit">
      <div
        className="whoisit__close"
        onClick={() => {
          setMysteryModal(false);
        }}
      >
        Close
      </div>
      <div className="whoisit_container">
        <img
          src={mysteryPokemon.sprites.other.dream_world.front_default}
          alt="Mystery Pokemon"
          className="whoisit__pokemon"
        />
        <p className="whoisit__title">Who's that Pokemon</p>
        <p className="whoisit__answer">{mysteryPokemon.name}</p>
        <div>
          <input
            type="text"
            name="whoisit_input"
            className="whoisit__input"
            placeholder="Take your guess"
          />
          <button
            onClick={() => {
              handleGuess();
            }}
          >
            Guess
          </button>
        </div>
      </div>
    </div>
  );
}

export default WhoIsThis;
