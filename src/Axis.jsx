export default function Axis(props) {
  const {
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
  } = props;
  return (
    <g>
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
        }}
      />
      <VerticalAxis
        {...{
          graphHeight,
          xPadding,
          yPadding,
          axisColor,
          yGradation,
          yScale,
          textPadding,
        }}
      />
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
  const {
    graphHeight,
    xPadding,
    yPadding,
    axisColor,
    yGradation,
    yScale,
    textPadding,
  } = props;
  return (
    <g>
      {/* tate */}
      <g>
        <line
          key="vertical-axis"
          x1={xPadding}
          y1={yPadding}
          x2={xPadding}
          y2={yPadding + graphHeight}
          stroke={axisColor}
        />
        {/* memori */}
        {yScale.ticks().map((tick, i) => {
          return (
            <g transform="translate(0, 50)" key={tick}>
              <line
                x1={xPadding}
                y1={yGradation(i)}
                x2={xPadding - textPadding}
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
              x={xPadding - textPadding}
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
