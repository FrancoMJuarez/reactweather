import React, { useState } from "react";
import axios from "axios";

function Input({ handleCityKey, APIKEY, cityList }) {
  const [cityName, setCityName] = useState("");
  const [message, setMessage] = useState("");

  const inputHandler = (e) => {
    setCityName(e.target.value);
  };

  const submitHandler = () => {
    let city = cityName.replace(/\s/g, "%20");
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKEY}&q=${city}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          setMessage("wrong");
        } else {
          let cityKey = response.data[0]["Key"];
          let cityName = response.data[0]["LocalizedName"];
          let cityCountry = response.data[0]["Country"]["ID"];
          if (cityList.some((city) => city.key === cityKey)) {
            setMessage("repeated");
          } else {
            handleCityKey(cityKey, cityName, cityCountry);
            setMessage("");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setCityName("");
  };

  const Message = () => {
    if (message === "repeated") {
      return "You already know the weather for that city, please try with another one";
    } else if (message === "wrong") {
      return "Please search for a valid city";
    } else {
      return "";
    }
  };

  return (
    <div>
      <div className="input">
        <input
          type="text"
          placeholder="Search for a City"
          className="input-form"
          value={cityName}
          onChange={inputHandler}
        />
        <button
          type="submit"
          className="input-submit"
          onClick={() => submitHandler()}
        >
          SUBMIT
        </button>
      </div>
      <p className="input-paragraph">
        <Message />
      </p>
    </div>
  );
}

export default Input;
