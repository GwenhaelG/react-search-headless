import React from 'react'
import { SearchBox } from 'react-search-headless'
import dataSet from './data.json'

const data = {
  planets: dataSet.bodies.filter((item) => item.isPlanet === true),
  satellites: dataSet.bodies
    .filter((item) => item.isPlanet === false && item.aroundPlanet)
    .filter((item) => item.englishName)
}

// How you are searching and rendering these data
const paramsSearch = {
  planets: {
    searchKeys: ['englishName'],
    renderName: (item) => item.englishName,
    renderMeta: (item) => item,
    minCar: 3,
    idKey: 'id'
  },
  satellites: {
    searchKeys: ['englishName', 'aroundPlanet.planet'],
    renderName: (item) =>
      `${item.englishName}, satellite of ${
        data.planets.filter(
          (planet) => planet.id === item.aroundPlanet.planet
        )[0].englishName
      }`,
    renderMeta: (item) => {
      const { id, aroundPlanet, ...meta } = item
      return meta
    },
    minCar: 1,
    idKey: 'id'
  }
}

const App = () => {
  return (
    <div>
      <SearchBox
        searchType='strict'
        data={data}
        parameters={paramsSearch}
        suggestions={true}
        onFilter={(value) => {
          console.log(value)
        }}
        onSelect={(group, value) => {
          console.log(group, value)
        }}
      />
    </div>
  )
}

export default App
