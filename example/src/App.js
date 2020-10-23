import React, { useState } from 'react'
import { useSearch } from 'react-search-headless'
import dataSet from './data.json'

// The data
const dataFilter = dataSet.bodies.filter((item) => item.isPlanet === true)

// How you are searching and rendering these data
const paramsSearchFilter = {
  searchKeys: ['englishName'],
  renderName: (item) => item.englishName,
  renderMeta: (item) => item,
  idKey: 'id'
}

// The data
const dataFilterDepth = dataSet.bodies.filter((item) => item.isPlanet === true)

// How you are searching and rendering these data
const paramsSearchFilterDepth = {
  searchDepth: 2,
  renderName: (item) => item.englishName,
  renderMeta: (item) => item,
  idKey: 'id'
}

// The data
const dataFilterGrouped = {
  planets: dataSet.bodies.filter((item) => item.isPlanet === true),
  satellites: dataSet.bodies
    .filter((item) => item.isPlanet === false && item.aroundPlanet)
    .filter((item) => item.englishName)
}

// How you are searching and rendering these data
const paramsSearchFilterGrouped = {
  planets: {
    searchKeys: ['englishName'],
    renderName: (item) => item.englishName,
    renderMeta: (item) => item,
    //minCar: 3,
    idKey: 'id'
  },
  satellites: {
    searchKeys: ['englishName', 'aroundPlanet.planet'],
    renderName: (item) =>
      `${item.englishName}, satellite of ${
        dataFilterGrouped.planets.filter(
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

// The data
const dataFilterGroupedDepth = {
  planets: dataSet.bodies.filter((item) => item.isPlanet === true),
  satellites: dataSet.bodies
    .filter((item) => item.isPlanet === false && item.aroundPlanet)
    .filter((item) => item.englishName)
}

// How you are searching and rendering these data
const paramsSearchFilterGroupedDepth = {
  planets: {
    renderName: (item) => item.englishName,
    renderMeta: (item) => item,
    //minCar: 3,
    idKey: 'id'
  },
  satellites: {
    searchDepth: 3,
    renderName: (item) =>
      `${item.englishName}, satellite of ${
        dataFilterGroupedDepth.planets.filter(
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
  const { filter, filterGrouped } = useSearch()

  // filter example
  const [selectionFilter, setSelectionFilter] = useState('')
  const [resultsFilter, setResultsFilter] = useState()

  // filter + depth example
  const [resultsFilterDepth, setResultsFilterDepth] = useState()

  // filterGrouped example
  const [selectionFilterGrouped, setSelectionFilterGrouped] = useState('')
  const [resultsFilterGrouped, setResultsFilterGrouped] = useState()

  // filterGrouped + depth example
  const [resultsFilterGroupedDepth, setResultsFilterGroupedDepth] = useState()

  return (
    <div style={{ padding: '20px' }}>
      {/*<h2>Using the styled Search Box</h2>
      <StyledSearchBox
        version='light'
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
      <div style={{ borderBottomColor: 'black' }} />
      <h2>Using the unstyled Search Box</h2>
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
      <div style={{ borderBottomColor: 'black' }} />*/}
      <h2>Using the hooks + filter</h2>
      <select
        style={{ marginRight: '15px' }}
        onChange={({ target: { value } }) => setSelectionFilter(value)}
      >
        <option value=''> -- Select an option -- </option>
        <option value='earth'>Earth</option>
        <option value='mars'>Mars</option>
        <option value='jupiter'>Jupiter</option>
        <option value='saturn'>Saturn</option>
        <option value='neptune'>Neptune</option>
        <option value='uranus'>Uranus</option>
        <option value='pluto'>Pluto</option>
      </select>
      <button
        type='button'
        disabled={selectionFilter !== '' ? false : true}
        onClick={() => {
          setResultsFilter(
            filter(dataFilter, paramsSearchFilter, 'strict', selectionFilter)
          )
        }}
      >
        Search
      </button>
      {resultsFilter &&
        resultsFilter.length > 0 &&
        resultsFilter.map((item, index) => (
          <p key={index}>{JSON.stringify(item.metadata)}</p>
        ))}
      <div style={{ borderBottomColor: 'black' }} />
      <h2>Using the hooks + filter + depth</h2>
      <input
        placeholder='Search anything...'
        style={{ marginRight: '15px' }}
        onChange={({ target: { value } }) =>
          setResultsFilterDepth(
            filter(dataFilterDepth, paramsSearchFilterDepth, 'strict', value)
          )
        }
      />
      {resultsFilterDepth &&
        resultsFilterDepth.length > 0 &&
        resultsFilterDepth.map((item, index) => (
          <p key={index}>{JSON.stringify(item.metadata)}</p>
        ))}
      <div style={{ borderBottomColor: 'black' }} />
      <h2>Using the hooks + filterGrouped</h2>
      <select
        style={{ marginRight: '15px' }}
        onChange={({ target: { value } }) => setSelectionFilterGrouped(value)}
      >
        <option value=''> -- Select an option -- </option>
        <option value='earth'>Earth's moons</option>
        <option value='mars'>Mars's moons</option>
        <option value='jupiter'>Jupiter's moons</option>
        <option value='saturn'>Saturn's moons</option>
        <option value='neptune'>Neptune's moons</option>
        <option value='uranus'>Uranus's moons</option>
        <option value='pluto'>Pluto's moons</option>
      </select>
      <button
        type='button'
        disabled={selectionFilterGrouped !== '' ? false : true}
        onClick={() => {
          setResultsFilterGrouped(
            filterGrouped(
              dataFilterGrouped,
              paramsSearchFilterGrouped,
              'strict',
              selectionFilterGrouped
            )
          )
        }}
      >
        Search
      </button>
      {resultsFilterGrouped &&
        resultsFilterGrouped.planets[0].metadata.moons.length > 0 &&
        resultsFilterGrouped.planets[0].metadata.moons.map((item, index) => (
          <p key={index}>{JSON.stringify(item)}</p>
        ))}
      <div style={{ borderBottomColor: 'black' }} />
      <h2>Using the hooks + filterGrouped + depth</h2>
      <input
        placeholder='Search anything...'
        style={{ marginRight: '15px' }}
        onChange={({ target: { value } }) =>
          setResultsFilterGroupedDepth(
            filterGrouped(
              dataFilterGroupedDepth,
              paramsSearchFilterGroupedDepth,
              'strict',
              value
            )
          )
        }
      />
      <p>
        {resultsFilterGroupedDepth &&
          (resultsFilterGroupedDepth.planets.length > 0 ||
            resultsFilterGroupedDepth.satellites.length > 0) &&
          JSON.stringify(resultsFilterGroupedDepth)}
      </p>
    </div>
  )
}

export default App
