import SelectProperty from "./SelectProperty";
import Chart from "./Chart";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [xProperty, setXProperty] = useState("sepalLength");
  const [yProperty, setYProperty] = useState("sepalWidth");

  function getXProperty(value) {
    setXProperty(value);
  }
  function getYProperty(value) {
    setYProperty(value);
  }

  async function getData() {
    const response = await fetch("https://assets.codepen.io/2004014/iris.json");
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  if (data == null) {
    return (
      <div>
        <p>matteeee!!!!!!</p>
      </div>
    );
  }

  return (
    <div>
      <SelectProperty {...{ getXProperty, getYProperty }} />
      <Chart {...{ data, xProperty, yProperty }} />
    </div>
  );
}
