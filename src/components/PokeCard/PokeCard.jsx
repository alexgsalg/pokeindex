import React from "react";
import "./style.scss";

import pokeBall from "../../assets/imgs/pokeball.png";

function PokeCard({pokemon}) {

  const calculateStats = (dataValue) => {
    let barClass;
    const barWidth = (100 * dataValue) / 160;
    if (dataValue < 40) barClass = 'low';
    if (dataValue >= 40 && dataValue <= 80) barClass = 'medium';
    if (dataValue > 80) barClass = 'high';
    return {
      class: barClass,
      width: `${Math.ceil(barWidth)}%`
    }
  }

  return (
    <div key={pokemon.id} className="card">
      <div className={`card_header ${pokemon.primaryType}`}>
        <div className="card_header__info">
          <span>{pokemon.id}</span>
          <p>
            {!pokemon.name.includes("-")
              ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
              : pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).slice(0, -2)}
          </p>
        </div>
        <ul>
          {pokemon.types.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>

        <img
          className="card_header__img"
          src={pokemon.image}
          height="150"
          alt={`${pokemon.name} draw`}
        />
        <img
          className="pokeshadow"
          src={pokemon.image}
          height="150"
          alt={`${pokemon.name} shadow`}
        />
        <img
          className="card_header__pokeball"
          src={pokeBall}
          alt="pokeball stamp"
        />
      </div>
      <div className="card_body">
        {pokemon.stats.map((status) => (
          <div className="stats_item" key={status.name}>
            <p className="stats_item__name">
              {!status.name.includes("-")
                ? status.name.charAt(0).toUpperCase() + status.name.slice(1)
                : status.name.charAt(0).toUpperCase() + status.name.slice(1).replace('-', ' ' )}
            </p>
            <p className="stats_item__data">{status.data}</p>
            <div className="progress">
              <div className={`progress_bar ${calculateStats(status.data).class}`} style={{width: calculateStats(status.data).width}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokeCard;