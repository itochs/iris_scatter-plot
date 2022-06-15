import * as d3 from "d3";
import Axis from "./Axis";
import Legend from "./Legend";
import { useState } from "react";

export default function Chart(props) {
  const xProperty = props.xProperty;
  const yProperty = props.yProperty;
  const colorProperty = "species";

  const species = [...new Set(props.data.map(({ species }) => species))];
  const [hideSpecies, setHideSpecies] = useState([null]);

  const xPadding = 50;
  const yPadding = 50;
  const textPadding = 12;
  const translateValue = `translate(${xPadding}, ${yPadding})`;

  const width = 800;
  const height = 800;
  const graphWidth = 400;
  const graphHeight = 400;
  const axisColor = "#888888";

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(props.data, (item) => item[xProperty]))
    .range([0, graphWidth])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(props.data, (item) => item[yProperty]))
    .range([graphHeight, 0])
    .nice();
  const colorScale = d3.scaleOrdinal(d3.schemeAccent);
  props.data.map((item) => {
    colorScale(item[colorProperty]);
  });

  const xGradation = d3
    .scaleLinear()
    .domain([0, xScale.ticks().length - 1])
    .range([0, graphWidth])
    .nice();
  const yGradation = d3
    .scaleLinear()
    .domain([0, yScale.ticks().length - 1])
    .range([graphHeight, 0])
    .nice();

  return (
    <div>
      <svg width={width} height={height}>
        <ViewData
          {...{
            data: props.data,
            xScale,
            yScale,
            colorScale,
            xProperty,
            yProperty,
            colorProperty,
            translateValue,
            hideSpecies,
          }}
        />
        <Axis
          {...{
            xPadding,
            yPadding,
            graphWidth,
            graphHeight,
            xScale,
            xGradation,
            yScale,
            yGradation,
            axisColor,
            textPadding,
          }}
        />

        <Legend
          {...{
            species,
            x: xPadding + graphWidth,
            y: yPadding,
            textPadding,
            colorScale,
            hideSpecies,
            setHideSpecies,
          }}
        />
      </svg>
    </div>
  );
}

function ViewData(props) {
  const {
    data,
    translateValue,
    xScale,
    yScale,
    colorScale,
    xProperty,
    yProperty,
    colorProperty,
    hideSpecies,
  } = props;
  return (
    <g>
      {data.map((item, i) => {
        // console.log(`want hide = ${hideSpecies}`)
        return (
          <g key={i} transform={translateValue}>
            <circle
              transform={`translate(
                                      ${xScale(item[xProperty])},
                                      ${yScale(item[yProperty])}
                                      )`}
              r="5"
              fill={colorScale(item[colorProperty])}
              opacity={hideSpecies.includes(item.species) ? 0 : 1}
              style={{ transition: "transform 0.5s, opacity 0.5s" }}
            />
          </g>
        );
      })}
    </g>
  );
}
