import React from "react";

function City({ city }) {

  const image = require(`../images/${city.weatherIcon}.png`)

  return (
    <div className="city-container">
      <div className="city-container-header"><span>{city.localizedName}</span><sup>{city.country}</sup></div>
      <div className="city-container-middle"><span>{city.temperature}</span><sup>°C</sup></div>
      <img src={image} alt="" height="100px"/>
      <div className="city-container-footer">{city.weatherText}</div>
    </div>
  );
}

export default City;
