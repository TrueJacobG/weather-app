import { dayFormatter, iconFormatter } from "../lib/lib";

const Week = ({ days }) => {
  return (
    <div className="week">
      {days.map((day) => (
        <div key={Math.random()} className="card">
          <img className="icon" src={`icons/${iconFormatter(day.iconCode)}.svg`} />
          <p>{dayFormatter(day.timestamp)}</p>
          <p>{day.maxTemp} °C</p>
        </div>
      ))}
    </div>
  );
};

export default Week;
