const ShowCountries = ({capitalWeather, countries,oneCountryInfo, handleShowOne}) => {

    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    
    if (countries.length > 1 && countries.length <= 10) {
      return (
        <div>
        {countries.map(country => 
          <li key={country}>
            {country}
            <button onClick={() => handleShowOne(country)}>show</button>
          </li>
          )}
        </div>
        )
    }

    if (oneCountryInfo !== null && capitalWeather != null) {
      const mapped = Object.entries(oneCountryInfo.languages).map(([k,v]) => `${v}`);


      return (
        <div>
          <h2>{oneCountryInfo.name.common}</h2>
          <p>capital {oneCountryInfo.capital}</p>
          <p>area {oneCountryInfo.area}</p>
          <h3>languages:</h3>
          <ul>
          {mapped.map(value =>
          <li key={value}>
            {value}
          </li>
          )}
          </ul>
          <h1>{oneCountryInfo.flag}</h1>
          <h3>Weather in {oneCountryInfo.capital}</h3>
          <p>temperature {capitalWeather.main.temp} Celsius</p>
          <img alt="weather image" src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`}/>
          <p>wind {capitalWeather.wind.speed} m/s</p>
        </div>
        )
    
        }
}

  
  export default ShowCountries
