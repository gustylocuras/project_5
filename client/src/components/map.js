import React, { useRef, useEffect } from 'react';
import { select, geoPath, geoMercator } from 'd3';
import useResizeObserver from 'use-resize-observer';


function Map ({data, property}) {


  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)


  useEffect( () => {
      const svg = select(svgRef.current)

      const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect()

      const projection = geoMercator()
      const pathGenerator = geoPath().projection(projection);

      svg
          .selectAll(".country")
          .data(data.features)
          .join("path")
          .attr("class", "country")
          .attr("d", (feature) => pathGenerator(feature))

    }, [data, dimensions, property]);

  return(
      <div ref={wrapperRef} style={{ marginBottom: "2rem"}}>
        <svg ref={svgRef}></svg>
      </div>
    )

}












export default Map;
