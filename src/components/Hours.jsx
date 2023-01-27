import { hourFormatter, iconFormatter } from "../lib/lib";

const Hours = ({ hours }) => {
  return (
    <div className="hours">
      <table className="time">
        <tbody>
          {hours.splice(0, 23).map((hour) => (
            <tr key={Math.random()}>
              <td>
                <img className="icon" src={`icons/${iconFormatter(hour.iconCode)}.svg`} />
              </td>
              <td className="hour">
                <p>{hourFormatter(hour.timestamp)}</p>
              </td>
              <td className="temp">
                <p>Temp: {hour.temp} °C</p>
              </td>
              <td className="wind">
                <p>Wind: {hour.windSpeed} km/h</p>
              </td>
              <td className="rain">
                <p>Rain: {hour.rain} %</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hours;
