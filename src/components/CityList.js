import React from "react";
import City from "./City";

function CityList({ cityList }) {
  return (
    <div className="city-list-container">
      {cityList.map((city) => (
        <City key={city.key} city={city} />
      ))}
    </div>
  );
}

export default CityList;
