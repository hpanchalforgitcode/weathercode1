import React, { useState, useEffect } from 'react';
import { Weather , weatherData} from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";


let IS_UNIT_C = true;

const WeatherList: React.FC = () => {
  

  useEffect(() => {
    const initialData = weatherData;
  }, [])

  const [searchText, setSearchText] = useState('');

  const [changedWeatherData, setNewWeatherData] = useState<Weather[]>(weatherData);
  const [favoritesData, setFavoritesData] = useState<Weather[]>([]);

  const [weatherUnit, setWeatherUnit ]= useState(IS_UNIT_C);

  const handleSearch = () => {
    const cityName = searchText.trim().toLowerCase();
    
    if (!cityName) {
      // If search text is empty, show all cities.
      setNewWeatherData(weatherData);
    } else {
      // Filter the cities based on the search text
      const filteredData = weatherData.filter((cityWeather) =>
        cityWeather.city.toLowerCase().includes(cityName)
      );
      
      if (filteredData.length === 0) {
        // If no matching cities are found, clear the results.
        setNewWeatherData([]);
      } else {
        setNewWeatherData(filteredData);
      }
    }
  };
  // const handleSearch = () => {
  //   const cityName = searchText.trim();

  // if (!cityName) {
  //   // If search text is empty, show all cities.
  //   setNewWeatherData(InitialData);
  // } else {
  //   const filteredData = changedWeatherData.filter((cityWeather) =>
  //     cityWeather.city.toLowerCase().includes(cityName.toLowerCase())
  //   );

  //   if (filteredData.length === 0) {
  //     // If no matching cities are found, do nothing.
  //     return;
  //   }

  //   setNewWeatherData(filteredData);
  // }

  // };

  const handleClearSearch = () => {
    setSearchText('');
    setNewWeatherData(weatherData);
  };

  const handleUnitChange = () => {
    IS_UNIT_C = !IS_UNIT_C;
    setWeatherUnit(IS_UNIT_C);

    if (!IS_UNIT_C) {
      const updatedData = changedWeatherData.map((cityWeather) => {
        return {
          ...cityWeather,
          temperature: (cityWeather.temperature * 9/5) + 32
        };
      });
      setNewWeatherData(updatedData);
    } else {
      const updatedData = changedWeatherData.map((cityWeather) => {
        return {
          ...cityWeather,
          temperature: (cityWeather.temperature - 32) * 5/9
        };
      });
      setNewWeatherData(updatedData);
    }
    
  };


  const handleAddFavorite = (cityId: number) => {
    
      const foundCity = changedWeatherData.find(city => city.id === cityId);

      if (foundCity) {
        setFavoritesData([...favoritesData, foundCity]);
      }
      else{
        return favoritesData;
      }
   
  };

  const handleRemoveFavorite = (cityId: number) => {
    const newFavoritesData = favoritesData.filter(city => city.id !== cityId);
    setFavoritesData(newFavoritesData);
  };

 
  function isFavorite(){

  }



  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={(event) => {setSearchText(event.target.value);
              handleSearch(); // Call the handleSearch function
            }}
            data-testid="search-input"
            value={searchText}
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

          {/* export interface Weather {
  id: number;
  city: string;
  temperature: number;
  description: string;
} */}
            {changedWeatherData.map((cityWeather)=>{
              return <>
                  <WeatherCard  weather={cityWeather} 
                      onAddFavorite={handleAddFavorite}
                      onRemoveFavorite={handleRemoveFavorite}
                      isFavorite={false}
                      unit={IS_UNIT_C?'C':'F'}
                    />
              </>
            })}

              {/* {todos.map((todo) => {
              return (
                <TodoItem {...todo}  toggleTodo={toggleTodo} deleteTodo={deleteTodo}  key={todo.id} />
              );
            })} */}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleUnitChange} data-testid="unit-change-button" className="outlined">
            Switch to {'Celsius'}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {favoritesData.map((cityWeather)=>{
              return <>
                  <WeatherCard  weather={cityWeather} 
                           onAddFavorite={handleAddFavorite}
                           onRemoveFavorite={handleRemoveFavorite}
                      isFavorite={true}
                      unit={IS_UNIT_C?'C':'F'}
                    />
              </>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
