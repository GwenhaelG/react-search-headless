import React, { useState } from 'react'
import { useSearch } from 'react-search-headless'
import dataSet from './data.json'

// The data
const data = dataSet.bodies.filter((item) => item.isPlanet === true)

// The data
const dataGrouped = {
  planets: dataSet.bodies.filter((item) => item.isPlanet === true),
  satellites: dataSet.bodies
    .filter((item) => item.isPlanet === false && item.aroundPlanet)
    .filter((item) => item.englishName)
}

const App = () => {
  const { filter, filterGrouped, SearchBox, SearchBoxGrouped } = useSearch()

  const [parameters, setParameters] = useState({
    component: 'hooks',
    searchType: 'strict',
    dataType: 'simple',
    searchKeys: null,
    searchDepth: null,
    minCar: null,
    fuzzySensibility: null
  })

  const [results, setResults] = useState()

  console.log(parameters, results)

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'lightgrey',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5px'
          }}
        >
          <p>Component</p>
          <select
            style={{ marginRight: '15px' }}
            value={parameters.searchType}
            onChange={({ target: { value } }) =>
              setParameters({ ...parameters, component: value })
            }
          >
            <option value='hooks'>Hooks</option>
            <option value='unstyled'>Unstyled Searchbox</option>
          </select>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5px'
          }}
        >
          <p>Search type</p>
          <select
            style={{ marginRight: '15px' }}
            value={parameters.searchType}
            onChange={({ target: { value } }) =>
              setParameters({ ...parameters, searchType: value })
            }
          >
            <option value='strict'>Strict</option>
            <option value='fuzzy'>Fuzzy</option>
          </select>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5px'
          }}
        >
          <p>Dataset type</p>
          <select
            style={{ marginRight: '15px' }}
            value={parameters.dataType}
            onChange={({ target: { value } }) =>
              setParameters({ ...parameters, dataType: value })
            }
          >
            <option value='simple'>Simple</option>
            <option value='grouped'>Grouped</option>
          </select>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5px'
          }}
        >
          <p>Search Keys</p>
          <select
            style={{ marginRight: '15px' }}
            value={parameters.searchKeys ? parameters.searchKeys : ''}
            onChange={({ target: { value } }) =>
              setParameters({
                ...parameters,
                searchKeys: value === '' ? null : value.split(',')
              })
            }
          >
            <option value=''>All</option>
            <option value={['englishName']}>{`['englishName']`}</option>
            <option
              value={['englishName', 'aroundPlanet.planet']}
            >{`['englishName','aroundPlanet.planet']`}</option>
          </select>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5px'
          }}
        >
          <p>Search depth</p>
          <input
            style={{ marginRight: '15px' }}
            value={parameters.searchDepth ? parameters.searchDepth : ''}
            min='0'
            type='number'
            onChange={({ target: { value } }) =>
              setParameters({
                ...parameters,
                searchDepth: value === '' ? null : value
              })
            }
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5px'
          }}
        >
          <p>Minimum characters</p>
          <input
            style={{ marginRight: '15px' }}
            value={parameters.minCar ? parameters.minCar : ''}
            min='0'
            type='number'
            onChange={({ target: { value } }) =>
              setParameters({
                ...parameters,
                minCar: value === '' ? null : value
              })
            }
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5px'
          }}
        >
          <p>Fuzzy sensibility</p>
          <input
            style={{ marginRight: '15px' }}
            value={
              parameters.fuzzySensibility ? parameters.fuzzySensibility : ''
            }
            min='0'
            type='number'
            onChange={({ target: { value } }) =>
              setParameters({
                ...parameters,
                fuzzySensibility: value === '' ? null : value
              })
            }
          />
        </div>
      </div>
      <div
        style={{
          borderBottom: '2px solid black',
          marginTop: '1vh',
          marginBottom: '1vh'
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          flexWrap: 'wrap',
          overflowWrap: 'break-word',
          wordWrap: 'break-word'
        }}
      >
        {parameters.component === 'hooks' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap'
            }}
          >
            <input
              placeholder='Search anything...'
              style={{ marginRight: '15px' }}
              onChange={({ target: { value } }) => {
                switch (parameters.dataType) {
                  case 'simple':
                    setResults(
                      filter(
                        data,
                        {
                          searchKeys: parameters.searchKeys,
                          searchDepth: parameters.searchDepth,
                          minCar: parameters.minCar,
                          fuzzySensibility: parameters.fuzzySensibility,
                          renderName: (item) => item.englishName,
                          renderMeta: (item) => item,
                          idKey: 'id'
                        },
                        parameters.searchType,
                        value
                      )
                    )
                    break
                  case 'grouped':
                    setResults(
                      filterGrouped(
                        dataGrouped,
                        {
                          planets: {
                            searchKeys: parameters.searchKeys,
                            searchDepth: parameters.searchDepth,
                            minCar: parameters.minCar,
                            fuzzySensibility: parameters.fuzzySensibility,
                            renderName: (item) => item.englishName,
                            renderMeta: (item) => {
                              const { id, aroundPlanet, ...meta } = item
                              return meta
                            },
                            idKey: 'id'
                          },
                          satellites: {
                            searchKeys: parameters.searchKeys,
                            searchDepth: parameters.searchDepth,
                            minCar: parameters.minCar,
                            fuzzySensibility: parameters.fuzzySensibility,
                            renderName: (item) =>
                              `${item.englishName}, satellite of ${
                                dataGrouped.planets.filter(
                                  (planet) =>
                                    planet.id === item.aroundPlanet.planet
                                )[0].englishName
                              }`,
                            renderMeta: (item) => {
                              const { id, aroundPlanet, ...meta } = item
                              return meta
                            },
                            idKey: 'id'
                          }
                        },
                        parameters.searchType,
                        value
                      )
                    )
                    break
                  default:
                    break
                }
              }}
            />
            {parameters.dataType === 'simple' &&
              results &&
              results.length > 0 &&
              results.map((item, index) => (
                <p key={index}>{JSON.stringify(item.metadata)}</p>
              ))}
            {parameters.dataType === 'grouped' &&
              results &&
              results.planets.length > 0 &&
              results.planets[0].metadata.moons.length > 0 &&
              results.planets[0].metadata.moons.map((item, index) => (
                <p key={index}>{JSON.stringify(item)}</p>
              ))}
          </div>
        )}
        {parameters.component === 'unstyled' &&
          parameters.dataType === 'simple' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap'
              }}
            >
              <SearchBox
                searchType={parameters.searchType}
                data={data}
                parameters={{
                  searchKeys: parameters.searchKeys,
                  searchDepth: parameters.searchDepth,
                  minCar: parameters.minCar,
                  fuzzySensibility: parameters.fuzzySensibility,
                  renderName: (item) => item.englishName,
                  renderMeta: (item) => item,
                  idKey: 'id'
                }}
                suggestions={true}
                onFilter={(value) => {
                  console.log(value)
                }}
                onSelect={(group, value) => {
                  console.log(group, value)
                }}
              />
              {results &&
                results.length > 0 &&
                results.map((item, index) => (
                  <p key={index}>{JSON.stringify(item.metadata)}</p>
                ))}
            </div>
          )}
        {parameters.component === 'unstyled' &&
          parameters.dataType === 'grouped' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap'
              }}
            >
              <SearchBoxGrouped
                searchType={parameters.searchType}
                data={dataGrouped}
                parameters={{
                  planets: {
                    searchKeys: parameters.searchKeys,
                    searchDepth: parameters.searchDepth,
                    minCar: parameters.minCar,
                    fuzzySensibility: parameters.fuzzySensibility,
                    renderName: (item) => item.englishName,
                    renderMeta: (item) => item,
                    idKey: 'id'
                  },
                  satellites: {
                    searchKeys: parameters.searchKeys,
                    searchDepth: parameters.searchDepth,
                    minCar: parameters.minCar,
                    fuzzySensibility: parameters.fuzzySensibility,
                    renderName: (item) =>
                      `${item.englishName}, satellite of ${
                        dataGrouped.planets.filter(
                          (planet) => planet.id === item.aroundPlanet.planet
                        )[0].englishName
                      }`,
                    renderMeta: (item) => {
                      const { id, aroundPlanet, ...meta } = item
                      return meta
                    },
                    idKey: 'id'
                  }
                }}
                suggestions={true}
                onFilter={(value) => {
                  console.log(value)
                }}
                onSelect={(group, value) => {
                  console.log(group, value)
                }}
              />
            </div>
          )}
      </div>
    </div>
  )
}

export default App
