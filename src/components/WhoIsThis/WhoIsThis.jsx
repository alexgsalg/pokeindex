import React, { useState } from "react";
import "./style.scss";

function WhoIsThis({
  mysteryPokemon,
  setMysteryModal,
  mysteryModal,
  randomPokemon,
}) {
  const [answer, setAnswer] = useState("?");
  const [correctGuess, setCorrectGuess] = useState(false);

  const handleGuess = () => {
    const guess = document.querySelector(".whoisit__input").value.toLowerCase();
    if (mysteryPokemon.name.includes("-") && guess === "nidoran") {
      setAnswer(mysteryPokemon.name);
      setCorrectGuess(true);

      setTimeout(() => {
        setMysteryModal(false);
        setCorrectGuess(false);
      }, 3000);
    } else if (guess == mysteryPokemon.name) {
      setAnswer(mysteryPokemon.name);
      setCorrectGuess(true);

      setTimeout(() => {
        setMysteryModal(false);
        setCorrectGuess(false);
      }, 3000);
    } else {
      setAnswer("Better luck next time");
      setTimeout(() => {
        setMysteryModal(false);
        setCorrectGuess(false);
      }, 3000);
    }
  };

  return (
    <div className={`whoisit ${mysteryModal ? "open" : ""}`}>
      <svg
        className="whoisit__close"
        onClick={() => {
          setMysteryModal(false);
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#ffffff"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      <div className="whoisit_container">
        <img
          src={mysteryPokemon.image}
          alt="Mystery Pokemon"
          className={`whoisit__pokemon ${correctGuess ? "correct" : ""}`}
        />
        <p className="whoisit__title">Who's that Pokemon</p>
        <p className="whoisit__answer">
          {!answer.includes("-")
            ? answer.charAt(0).toUpperCase() + answer.slice(1)
            : answer.charAt(0).toUpperCase() + answer.slice(1).slice(0, -2)}
        </p>
        {/* <p className="whoisit__name">{mysteryPokemon.name}</p> */}
        <div className="whoisit_actions">
          <input
            type="text"
            name="whoisit_input"
            className="whoisit__input"
            placeholder="Take your guess"
            autoComplete="off"
          />
          <button
            onClick={() => {
              randomPokemon();
            }}
          >
            choose another
          </button>
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
