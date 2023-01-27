import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';

const Forecast = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('metric');
    let [responseObj, setResponseObj] = useState({});
    let [responseGeo, setResponseGeo] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    function getForecast(e) {
        e.preventDefault();

        if (city.length === 0) {
            return setError(true);
        }

        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});
        setResponseGeo({});
        setLoading(true);

        const uriEncodedCity = encodeURIComponent(city);
        let KEY = process.env.REACT_APP_API_KEY
        const geoCoding = fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${uriEncodedCity}&limit=1&appid=${KEY}`)
        .then(responseGeo => responseGeo.json())    
        .then(responseGeo => {
                setResponseGeo(responseGeo);
            })

        geoCoding.then(apiCall => {
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${apiCall[0].lat}&lon=${apiCall[0].lon}&units=${unit}&appid=${KEY}`)
        })
            .then(response => response.json())
            .then(response => {
                setResponseObj(response);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.log(err.message);
            });
    }

    return (
        <div>
            <h2>Find Current Weather Conditions</h2>
            <br />
            <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className={classes.textInput}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        className={classes.input}
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    <div className={classes.rad_design}></div>
                    <div className={classes.rad_text}>Fahrenheit</div>
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        className={classes.input}
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    <div className={classes.rad_design}></div>
                    <div className={classes.rad_text}>Celsius</div>
                </label>

                <button className={classes.Button} type="submit"> <span> Get Forecast </span> </button>
            </form>
            <Conditions
                responseObj={responseObj}
                responseGeo={responseGeo}
                error={error}
                loading={loading}
                unit={unit}
            />
        </div>
    )
}

export default Forecast;
