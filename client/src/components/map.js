import React, { useRef, useEffect, useState } from 'react';
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3';
import useResizeObserver from 'use-resize-observer';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';



function Map ({ geojson, property}) {

  const COUNTRIES_QUERY = gql`
    query countriesQuery {
      countries {
        country
        countryInfo{
          lat
          long
        }
        cases
        todayCases
        deaths
        todayDeaths
        recovered
        todayRecovered
        active
        critical
        tests
        activePerOneMillion
        recoveredPerOneMillion

      }
    }

    `;
    const { loading, error, data } = useQuery(COUNTRIES_QUERY, { errorPolicy: 'all' });


    // if (error) console.log(error); return `Error! ${error}`;
    console.log(data);
    console.log(geojson);

  const { selectedCountry, setSelectedCountry } = useState({})
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)


  useEffect( () => {
      const svg = select(svgRef.current)
      const minProp = min(geojson.features, (feature) => feature.properties[property])
      const maxProp = max(geojson.features, (feature) => feature.properties[property])
      const colorScale = scaleLinear()
                          .domain([minProp, maxProp])
                          .range(["#ccc", "red"])
      console.log(minProp, maxProp);
      const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect()


      const projection = geoMercator()

      const pathGenerator = geoPath().projection(projection)


      svg
          .selectAll(".country")
          .data(geojson.features)
          .join("path")
          // .on("click", feature => setSelectedCountry(feature))
          .attr("class", "country")
          .transition()
          .attr("fill", feature => colorScale(feature.properties[property]))
          .attr("d", (feature) => pathGenerator(feature))



    }, [geojson, dimensions, property]);



      return(
          <div ref={wrapperRef}>
            <svg ref={svgRef} style={{height: "500px", width: "960px"}} ></svg>

          </div>
        )

  }















export default Map;
