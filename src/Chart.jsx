import * as d3 from "d3";
import { useState } from "react";

export default function Chart(props) {
  // const [xProperty, setXProperty] = useState([])
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
  // console.log(yScale.ticks())

  function drawPoint(data) {
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

  return (
    <div>
      <svg width={width} height={height}>
        {/* {drawPoint(props.data)} */}
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
        <HorizontalAxis
          {...{
            xPadding,
            yPadding,
            graphHeight,
            graphWidth,
            axisColor,
            xScale,
            textPadding,
            xGradation,
            yGradation,
          }}
        />
        <VerticalAxis
          {...{
            height: graphHeight,
            x: xPadding,
            y: yPadding,
            axisColor,
            yGradation,
            yScale,
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

function HorizontalAxis(props) {
  const {
    xPadding,
    yPadding,
    graphHeight,
    graphWidth,
    axisColor,
    xScale,
    textPadding,
    xGradation,
  } = props;

  return (
    <g>
      <line
        x1={xPadding}
        y1={yPadding + graphHeight}
        x2={xPadding + graphWidth}
        y2={yPadding + graphHeight}
        stroke={axisColor}
      />
      {xScale.ticks().map((tick, i) => {
        return (
          <g key={`g-${tick}`} transform="translate(50, 0)">
            <text
              key={tick}
              x={xGradation(i)}
              y={yPadding + graphHeight + textPadding}
              textAnchor="middle"
              dominantBaseline="hanging"
            >
              {tick}
            </text>
            <line
              key={`${tick}-${i}`}
              x1={xGradation(i)}
              y1={yPadding + graphHeight + textPadding}
              x2={xGradation(i)}
              y2={yPadding + graphHeight}
              stroke={axisColor}
            ></line>
          </g>
        );
      })}
    </g>
  );
}

function VerticalAxis(props) {
  const { height, x, y, axisColor, yGradation, yScale, textPadding } = props;
  return (
    <g>
      {/* tate */}
      <g>
        <line
          key="vertical-axis"
          x1={x}
          y1={y}
          x2={x}
          y2={y + height}
          stroke={axisColor}
        />
        {/* memori */}
        {yScale.ticks().map((tick, i) => {
          return (
            <g transform="translate(0, 50)" key={tick}>
              <line
                x1={x}
                y1={yGradation(i)}
                x2={x - textPadding}
                y2={yGradation(i)}
                stroke={axisColor}
              ></line>
            </g>
          );
        })}
      </g>

      {yScale.ticks().map((tick, i) => {
        return (
          <g transform="translate(0, 50)" key={tick}>
            <text
              key={tick}
              x={x - textPadding}
              y={yGradation(i)}
              textAnchor="end"
              dominantBaseline="middle"
            >
              {tick}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Legend(props) {
  const {
    species,
    x,
    y,
    textPadding,
    colorScale,
    hideSpecies,
    setHideSpecies,
  } = props;
  const legendBoxLength = 15;

  function getHideSpecies(name) {
    // console.log(`hide ${hideSpecies}`)
    if (hideSpecies.includes(name)) {
      const newHide = [...hideSpecies].filter((seed) => {
        // console.log(`seed name = ${seed}`)
        return !(seed === name);
      });
      setHideSpecies([...newHide]);
    } else {
      setHideSpecies([...new Set([...hideSpecies, name])]);
    }
  }

  return (
    <g>
      {species.map((seed, i) => {
        return (
          <g
            key={seed}
            id={seed}
            transform={`translate(${x + 20}, ${y})`}
            onClick={(event) => {
              // console.log(event.currentTarget.id)
              getHideSpecies(event.currentTarget.id);
            }}
            opacity={hideSpecies.includes(seed) ? 0.5 : 1}
            style={{ transition: "opacity 0.5s", cursor: "pointer" }}
          >
            <rect
              x={0}
              y={i * legendBoxLength * 2}
              width={legendBoxLength}
              height={legendBoxLength}
              fill={colorScale(seed)}
            />
            <text
              x={textPadding / 3 + legendBoxLength}
              y={i * legendBoxLength * 2}
              textAnchor="start"
              dominantBaseline="hanging"
              style={{ userSelect: "none" }}
            >
              {seed}
            </text>
          </g>
        );
      })}
    </g>
  );
}
