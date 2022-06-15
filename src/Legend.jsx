export default function Legend(props) {
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
