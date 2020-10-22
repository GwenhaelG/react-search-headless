import React from 'react'
import SearchBox from 'react-search-headless'

// Data you want to search on
const dataSearch = {
  planets: [
    { id: 1, name: 'Mercury' },
    { id: 2, name: 'Venus' },
    { id: 3, name: 'Earth' },
    { id: 4, name: 'Mars' }
  ],
  satellites: [
    { id: 1, name: 'Moon', planet: { name: 'Earth' } },
    { id: 2, name: 'Deimos', planet: { name: 'Mars' } },
    { id: 3, name: 'Phoebos', planet: { name: 'Mars' } }
  ]
}

// How you are searching and rendering these data
const paramsSearch = {
  planets: {
    searchKeys: ['name'],
    renderName: (item) => item.name,
    renderMeta: (item) => item,
    minCar: 3,
    idKey: 'id'
  },
  satellites: {
    searchKeys: ['name', 'planet.name'],
    renderName: (item) => `${item.name}, satellite of ${item.planet.name}`,
    renderMeta: (item) => {
      const { id, planet, ...meta } = item
      return meta
    },
    minCar: 1,
    idKey: 'id'
  }
}

const App = () => {
  return (
    <SearchBox
      searchType='strict'
      data={dataSearch}
      parameters={paramsSearch}
      suggestions={true}
      onFilter={(value) => {
        console.log(value)
      }}
      onSelect={(group, value) => {
        console.log(group, value)
      }}
    />
  )
}

export default App
