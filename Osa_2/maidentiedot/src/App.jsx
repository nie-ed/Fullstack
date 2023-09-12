import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountries from './components/ShowCountries'



const App = () => {
  const [countries, setCountries] = useState({})
  const [oneCountry, setOneCountry] = useState(null)
  const [newFilter, setNewFilter] = useState('')
  const [oneCountryInfo, setOneCountryInfo] = useState(null)
  const [capitalWeather, setCapitalWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY


  useEffect(() => {
// getting all counties names
    if (newFilter) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          onSearch(response.data)
        })
    }
  }, [newFilter])



  useEffect(() => {
//getting one counties info
    if (oneCountry) {
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${oneCountry}`)
      .then(response => {
          setOneCountryInfo(response.data)
        })
    }

  }, [oneCountry])



  useEffect(() => {
//getting one capitals weather
    if (oneCountryInfo) {  
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${oneCountryInfo.capital}&units=metric&appid=${api_key}`)
      .then((response) => {
          setCapitalWeather(response.data)
        })

    }
  }, [oneCountryInfo])


  







  const onSearch = (data) => {
    const countryInfo = data.filter(count => count.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    const countryNames = countryInfo.map(count => count.name.common)
    
    if (countryNames.length === 1) {
      setOneCountry(countryNames)
      setCountries(countryNames)
      
    }
    if (countryNames.length > 1) {
      setCountries(countryNames)
    }
  }

  const handleShowOne = (country) => {
    setOneCountry(country)
    setCountries([countries])
  }

  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  

  return (
    <div>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
      <ShowCountries capitalWeather={capitalWeather} countries={countries} oneCountryInfo={oneCountryInfo} handleShowOne={handleShowOne}/>

    </div>
  )
}

export default App
