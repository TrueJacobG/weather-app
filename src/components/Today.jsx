import { iconFormatter } from "../lib/lib";

const Today = ({ today }) => {
  return (
    <div className="today">
      <div className="icon">
        <img className="image" src={`icons/${iconFormatter(today.iconCode)}.svg`} />
        <p>{today.currentTemp} °C</p>
      </div>
      <div className="info">
        <div className="temp">
          <p>Highest: {today.highTemp} °C</p>
          <p>Lowest: {today.lowTemp}°C</p>
        </div>
        <div className="other">
          <p>Wind: {today.windSpeed} km/h</p>
          <p>Rain: {today.rain}%</p>
        </div>
      </div>
    </div>
  );
};

export default Today;
