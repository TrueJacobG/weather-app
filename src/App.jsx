import { useEffect, useState } from "react";
import "./App.css";
import Week from "./components/Week";
import Today from "./components/Today";
import Hours from "./components/Hours";
import { getWeather, dayFormatter, iconFormatter } from "./lib/lib";

const App = () => {
  const [today, setToday] = useState({});
  const [days, setDays] = useState([]);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone)
      .then((data) => {
        console.log(data);
        setDays((d) => [...Object.values(data.daily)]);
        setToday((t) => data.current);
        setHours((h) => [...Object.values(data.hourly)]);
      })
      .catch((e) => {
        console.error(e);
        alert("Api error!");
      });
  }, []);

  return (
    <div className="App">
      <Today today={today} />
      <Week days={days} />
      <Hours hours={hours} />
    </div>
  );
};

export default App;
