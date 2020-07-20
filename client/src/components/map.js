import React, {  useEffect } from 'react';
import * as d3 from 'd3';




function Map ({ geojson, property}) {



  useEffect(() => {
      const svg = d3.select('svg')
      const minProp = d3.min(geojson.features, (feature) => feature.properties[property])
      const maxProp = d3.max(geojson.features, (feature) => feature.properties[property])
      const colorScale = d3.scaleLinear()
                          .domain([minProp, maxProp])
                          .range(["#ccc", "red"])


      const projection = d3.geoMercator()

      const pathGenerator = d3.geoPath().projection(projection)


      svg
          .selectAll(".country")
          .data(geojson.features)
          .join("path")
          .attr("class", "country")
          .transition()
          .attr("fill", feature => colorScale(feature.properties[property]))
          .attr("d", (feature) => pathGenerator(feature))



    }, [geojson,  property]);



      return(
          <div className="map">
            <svg className="svg-map" style={{height: "500px", width: "960px"}} ></svg>

          </div>
        )

  }















export default Map;
