import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import CityList from "./components/CityList";
import Footer from "./components/Footer";
import Input from "./components/Input";

function App() {
  const [citys, setCitys] = useState([]);
  const [cityInfo, setCityInfo] = useState({
    key: undefined,
    localizedName: "",
    country: "",
    weatherText: "",
    weatherIcon: undefined,
    temperature: undefined,
    isDayTime: undefined,
  });

  const API_KEY = "8mGq41LQ3ahzStXTIsDA3pTk3Sjn6WSX";

  const inputCityKey = (keyAux, nameAux, countryAux) => {
    axios
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/${keyAux}?apikey=${API_KEY}`
      )
      .then((response) => {
        let weatherAux = response.data[0].WeatherText.toUpperCase();
        let iconAux = response.data[0].WeatherIcon;
        let temperatureAux = response.data[0].Temperature.Metric.Value;
        let isDayTimeAux = response.data[0].IsDayTime;
        setCityInfo({
          key: keyAux,
          localizedName: nameAux,
          country: countryAux,
          weatherText: weatherAux,
          weatherIcon: iconAux,
          temperature: temperatureAux,
          isDayTime: isDayTimeAux,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (cityInfo.key) {
      setCitys((prevCitys) => [cityInfo, ...prevCitys]);
    }
  }, [cityInfo]);

  return (
    <div className="App">
      <h1 className="title">Weather App</h1>
      <Input handleCityKey={inputCityKey} APIKEY={API_KEY} cityList={citys} />
      <CityList cityList={citys} />
      <Footer />
    </div>
  );
}

export default App;
