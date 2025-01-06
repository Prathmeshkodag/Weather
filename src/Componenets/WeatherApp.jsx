import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetWeather } from "./CreatSLice";

function WeatherApp() {
    const [cityName, setCityName] = useState('');
    
    // Get weather data, loading state, and error from Redux store
    const { weathercity, loading, error } = useSelector((state) => state.weathercitydata);
    
    const dispatch = useDispatch();
    const APIkey = '25377e2efce06c17855e7c3772e931c4';

    const search = (e) => {
        e.preventDefault();
        if (cityName.trim()) {
            dispatch(GetWeather(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`));
        }
    };

    // Format sunrise and sunset times
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
    };

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px" }}>
            <form className="max-w-md mx-auto w-full" onSubmit={search}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search City Weather"
                        required
                        autoComplete="on"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                search(e);
                            }
                        }}
                    />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                    </button>
                </div>
            </form>

            
            {loading && <p>Loading...</p>}

            
            {weathercity?.name ? (
                <div className="flex w-full  items-center justify-content-between bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 " style={{ backgroundImage: "url('https://www.weathercompany.com/wp-content/uploads/2024/02/hero-sky-dramatic-lightning-weather-shutterstock_2200924189.jpg')", backgroundPosition: "center", backgroundSize: "cover" }}>
                    <div className="flex flex-col justify-between p-4 leading-normal w-full text-white">
                        <p className="mb-3 font-normal text-white-700 dark:text-gray-400">City Name: {weathercity?.name}</p>
                        <p className="mb-3 font-normal  text-white-700 dark:text-gray-400">Humidity: {weathercity?.main?.humidity}%</p>
                        <p className="mb-3 font-normal  text-white-700 dark:text-gray-400">Description: {weathercity?.weather?.[0]?.main}</p>
                        <p className="mb-3 font-normal  text-white-700 dark:text-gray-400">Temperature: {weathercity?.main?.temp}°C</p>
                        <p className="mb-3 font-normal  text-white-700 dark:text-gray-400">Wind Speed: {weathercity?.wind?.speed} m/s</p>
                        <p className="mb-3 font-normal  text-white-700 dark:text-gray-400">Sunrise: {formatTime(weathercity?.sys?.sunrise)} AM</p>
                        <p className="mb-3 font-normal  text-white-700 dark:text-gray-400">Sunset: {formatTime(weathercity?.sys?.sunset)} PM</p>
                    </div>
                </div>
            ) : error ? (
                <p>{error}</p>
            ):null}
        </div>
    );
}

export default WeatherApp;
