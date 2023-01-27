
import React from 'react';
import classes from './Conditions.module.css'
import Arrow from './arrow.png';
import Wind from './wind.png';
import Humidity from './humidity.png';
import Atmoshperic from './gauge.png';
import Thermo from './thermometer.png';
import Cold from './cold.png';
import Hot from './hot.png';
import Umbrella from './umbrella.png';
import Sunrise from './sunrise.png';
import Sunset from './sunset.png';
import Cloudy from './cloudy.png';
import moment from 'moment';
import { Table, Tbody, Tr, Td } from 'react-responsive-list'
import 'react-responsive-list/assets/index.css'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


let compassSector = ["N", "N-NE", "NE", "E-NE", "E", "E-SE", "SE", "S-SE", "S", "S-SW", "SW", "W-SW", "W", "W-NW", "NW", "N-NW", "N"];

function degrees(unit) {
    if (unit === "metric")
        return "C";
    else
        return "F";
}

function clothes(unit, t) {
    if (unit === "metric") {
        if (t <= 22)
            return (<>
                <img src={Cold} alt="wind icon" style={{ width: 50, marginRight: 20, height: 50 }} />
                It's cold, dress accordingly!
            </>);
        else
            return (<>
                <img src={Hot} alt="wind icon" style={{ width: 50, marginRight: 20, height: 50 }} />
                It's Warm, dress accordingly!
            </>);
    }

    if (unit === "imperial") {
        if (t <= 70)
            return (<>
                <img src={Cold} alt="wind icon" style={{ width: 50, marginRight: 20, height: 50 }} />
                It's cold, dress accordingly!
            </>);
        else
            return (<>
                <img src={Hot} alt="wind icon" style={{ width: 50, marginRight: 20, height: 50 }} />
                It's Warm, dress accordingly!
            </>);
    }
}

function rain(x) {
    if (x.includes("rain")) {
        return (<>
            <img src={Umbrella} alt="wind icon" style={{ width: 50, marginRight: 20, height: 50 }} />
            Get an umbrella, it will rain today!
        </>);
    }
}

const conditions = (props) => {
    return (
        <div className={classes.Wrapper}>
            {props.error && (
                <small className={classes.Small}> Please enter a valid city. </small>
            )}

            {props.loading && <div className={classes.Loader} />}

            {props.responseGeo && (
                <div>{props.responseGeo.name}, {props.responseGeo.country}</div>
            )}

            {props.responseObj.current && (
                <div className={classes.information}>
                    <p className={classes.title}>
                        {Math.round(props.responseObj.current.temp)}° with{" "}
                        {props.responseObj.current.weather[0].description}.{" "}
                    </p>
                    <p className={classes.title} ><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.current.weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></p>
                    {
                        <p className={classes.info}>
                            {clothes(props.unit, Math.round(props.responseObj.current.temp))}
                        </p>
                    }
                    <p className={classes.info}>
                        {rain(props.responseObj.current.weather[0].description)}
                    </p>
                    <p className={classes.info}>
                        <img
                            src={Thermo}
                            alt="feels like icon"
                            style={{ width: 50, height: 50 }}
                        />{" "}
                        Feels like:{" "}
                        <b>{props.responseObj.current.feels_like.toFixed()}° </b>
                    </p>
                    <p className={classes.info}>
                        <img
                            src={Atmoshperic}
                            alt="atmospheric icon"
                            style={{ width: 50, marginRight: 5, height: 50 }}
                        />{" "}
                        Atmoshperic Pressure: <b>{props.responseObj.current.pressure}hPa</b>
                    </p>
                    <p className={classes.info}>
                        <img
                            src={Humidity}
                            alt="humidity icon"
                            style={{ width: 50, marginRight: 5, height: 50 }}
                        />{" "}
                        Humidity: <b>{props.responseObj.current.humidity}%</b>
                    </p>
                    <p className={classes.info}>
                        <img
                            src={Cloudy}
                            alt="cloudy icon"
                            style={{ width: 50, height: 50 }}
                        />{" "}
                        Cloudiness: <b>{props.responseObj.current.clouds}% </b>
                    </p>
                    <p className={classes.info}>
                        <img
                            src={Wind}
                            alt="wind icon"
                            style={{ width: 50, marginRight: 5, height: 50 }}
                        />{" "}
                        Wind:{" "}
                        <b>
                            {props.responseObj.current.wind_speed} m/s,{" "}
                            {
                                compassSector[
                                (props.responseObj.current.wind_deg / 22.5).toFixed(0)
                                ]
                            }{" "}
                        </b>{" "}
                        <img
                            src={Arrow}
                            alt="windarrow"
                            style={{
                                width: 14,
                                transform: `rotate(${props.responseObj.current.wind_deg}deg)`,
                                height: 14
                            }}
                        />
                    </p>
                    <p className={classes.info}>
                        <img
                            src={Sunrise}
                            alt="sunrise icon"
                            style={{ width: 50, marginRight: 5, height: 50 }}
                        />{" "}
                        Sunrise is at:{" "}
                        <b>
                            {moment.unix(props.responseObj.current.sunrise).format("HH:mm")}{" "}
                        </b>
                    </p>
                    <p className={classes.info}>
                        {" "}
                        <img
                            src={Sunset}
                            alt="sunset icon"
                            style={{ width: 50, marginRight: 5, height: 50 }}
                        />
                        Sunset is at:{" "}
                        <b>
                            {moment.unix(props.responseObj.current.sunset).format("HH:mm")}
                        </b>
                    </p>
                </div>
            )}
            {props.responseObj.hourly && (
                <ResponsiveContainer width="99%" aspect={3}>
                    <LineChart width={400} height={200} data={props.responseObj.hourly}>
                        <Line type="monotone" dataKey="temp" stroke="#32a852" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="dt" tickFormatter={timeStr => moment.unix(timeStr).format("HH")} />
                        <YAxis dateKey="temp" type="number" allowDecimals={false} />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            )}

            {props.responseObj.daily && (

                <div>
                    <h1>Daily Forecast</h1>
                    <Table breakPoint={700}>
                        {/* <Thead>
                        <Tr>
                            <Th>Date:</Th>
                            <Th>Temperature (day/night)</Th>
                            <Th>Icon</Th>
                            <Th>Description</Th>
                        </Tr>
                    </Thead> */}
                        <Tbody>
                            {/* <Tr>
                            <Td className={classes.temperatura}>{Math.round(props.responseObj.daily[0].temp.max)} / {Math.round(props.responseObj.daily[0].temp.min)} °{degrees(props.unit)}</Td>
                            <Td className={classes.temperatura}>{Math.round(props.responseObj.daily[1].temp.max)} / {Math.round(props.responseObj.daily[1].temp.min)} °{degrees(props.unit)}</Td>
                            <Td className={classes.temperatura}>{Math.round(props.responseObj.daily[2].temp.max)} / {Math.round(props.responseObj.daily[2].temp.min)} °{degrees(props.unit)}</Td>
                            <Td className={classes.temperatura}>{Math.round(props.responseObj.daily[3].temp.max)} / {Math.round(props.responseObj.daily[3].temp.min)} °{degrees(props.unit)}</Td>
                            <Td className={classes.temperatura}>{Math.round(props.responseObj.daily[4].temp.max)} / {Math.round(props.responseObj.daily[4].temp.min)} °{degrees(props.unit)}</Td>
                            <Td className={classes.temperatura}>{Math.round(props.responseObj.daily[5].temp.max)} / {Math.round(props.responseObj.daily[5].temp.min)} °{degrees(props.unit)}</Td>
                            <Td className={classes.temperatura}>{Math.round(props.responseObj.daily[6].temp.max)} / {Math.round(props.responseObj.daily[6].temp.min)} °{degrees(props.unit)}</Td>
                            <Td className={classes.temperatura}>{Math.round(props.responseObj.daily[7].temp.max)} / {Math.round(props.responseObj.daily[7].temp.min)} °{degrees(props.unit)}</Td>
                        </Tr>
                        <Tr>
                            <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[0].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                            <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[1].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                            <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[2].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                            <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[3].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                            <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[4].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                            <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[5].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                            <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[6].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                            <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[7].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                        </Tr>
                        <Tr>
                            <Td>{props.responseObj.daily[0].weather[0].description}</Td>
                            <Td>{props.responseObj.daily[1].weather[0].description}</Td>
                            <Td>{props.responseObj.daily[2].weather[0].description}</Td>
                            <Td>{props.responseObj.daily[3].weather[0].description}</Td>
                            <Td>{props.responseObj.daily[4].weather[0].description}</Td>
                            <Td>{props.responseObj.daily[5].weather[0].description}</Td>
                            <Td>{props.responseObj.daily[6].weather[0].description}</Td>
                            <Td>{props.responseObj.daily[7].weather[0].description}</Td>
                        </Tr> */}
                            <Tr>
                                <Td><span className={classes.date}>{moment.unix(props.responseObj.daily[0].dt).format("ddd, Do MMM")}</span></Td>
                                <Td>{Math.round(props.responseObj.daily[0].temp.max)} / {Math.round(props.responseObj.daily[0].temp.min)} °{degrees(props.unit)}</Td>
                                <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[0].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                                <Td>{props.responseObj.daily[0].weather[0].description}</Td>
                            </Tr>
                            <Tr>
                                <Td><span className={classes.date}>{moment.unix(props.responseObj.daily[1].dt).format("ddd, Do MMM")}</span></Td>
                                <Td>{Math.round(props.responseObj.daily[1].temp.max)} / {Math.round(props.responseObj.daily[1].temp.min)} °{degrees(props.unit)}</Td>
                                <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[1].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                                <Td>{props.responseObj.daily[1].weather[0].description}</Td>
                            </Tr>
                            <Tr>
                                <Td><span className={classes.date}>{moment.unix(props.responseObj.daily[2].dt).format("ddd, Do MMM")}</span></Td>
                                <Td>{Math.round(props.responseObj.daily[2].temp.max)} / {Math.round(props.responseObj.daily[2].temp.min)} °{degrees(props.unit)}</Td>
                                <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[2].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                                <Td>{props.responseObj.daily[2].weather[0].description}</Td>
                            </Tr>
                            <Tr>
                                <Td><span className={classes.date}>{moment.unix(props.responseObj.daily[3].dt).format("ddd, Do MMM")}</span></Td>
                                <Td>{Math.round(props.responseObj.daily[3].temp.max)} / {Math.round(props.responseObj.daily[3].temp.min)} °{degrees(props.unit)}</Td>
                                <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[0].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                                <Td>{props.responseObj.daily[0].weather[0].description}</Td>
                            </Tr>
                            <Tr>
                                <Td><span className={classes.date}>{moment.unix(props.responseObj.daily[4].dt).format("ddd, Do MMM")}</span></Td>
                                <Td>{Math.round(props.responseObj.daily[4].temp.max)} / {Math.round(props.responseObj.daily[4].temp.min)} °{degrees(props.unit)}</Td>
                                <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[4].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                                <Td>{props.responseObj.daily[4].weather[0].description}</Td>
                            </Tr>
                            <Tr>
                                <Td><span className={classes.date}>{moment.unix(props.responseObj.daily[5].dt).format("ddd, Do MMM")}</span></Td>
                                <Td>{Math.round(props.responseObj.daily[5].temp.max)} / {Math.round(props.responseObj.daily[5].temp.min)} °{degrees(props.unit)}</Td>
                                <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[5].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                                <Td>{props.responseObj.daily[5].weather[0].description}</Td>
                            </Tr>
                            <Tr>
                                <Td><span className={classes.date}>{moment.unix(props.responseObj.daily[6].dt).format("ddd, Do MMM")}</span></Td>
                                <Td>{Math.round(props.responseObj.daily[6].temp.max)} / {Math.round(props.responseObj.daily[6].temp.min)} °{degrees(props.unit)}</Td>
                                <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[6].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                                <Td>{props.responseObj.daily[6].weather[0].description}</Td>
                            </Tr>
                            <Tr>
                                <Td><span className={classes.date}>{moment.unix(props.responseObj.daily[7].dt).format("ddd, Do MMM")}</span></Td>
                                <Td>{Math.round(props.responseObj.daily[7].temp.max)} / {Math.round(props.responseObj.daily[7].temp.min)} °{degrees(props.unit)}</Td>
                                <Td><img className="card-img-top" src={`http://openweathermap.org/img/wn/${props.responseObj.daily[7].weather[0].icon}@2x.png`} alt="weather icon" style={{ width: 110, height: 110 }} /></Td>
                                <Td>{props.responseObj.daily[7].weather[0].description}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </div>
            )}

        </div>
    );
};

export default conditions;