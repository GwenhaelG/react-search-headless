import React, { useState } from 'react'
import { useSearch } from 'react-search-headless'
import dataSet from './data.json'
import styled from 'styled-components'

const StyledSelect = styled.select`
  padding: 8px;
  display: block;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: 100%;
  text-align-last: right;
`

const StyledInput = styled.input`
  padding: 8px;
  display: block;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 100%;
  text-align: right;
`

// The data
const data = dataSet.bodies.filter((item) => item.isPlanet === true)

// The data
const dataGrouped = {
  planets: dataSet.bodies.filter((item) => item.isPlanet === true),
  satellites: dataSet.bodies
    .filter((item) => item.isPlanet === false && item.aroundPlanet)
    .filter((item) => item.englishName)
}

const StyledSuggestion = styled.div`
  font-family: 'Arial';
  background-color: ${(props) =>
    props.variant === 'light' ? 'white' : 'black'};
  color: ${(props) => (props.variant === 'light' ? 'black' : 'white')};
  border-radius: 5px;
  display: inline-block;
  margin-bottom: 0;
  text-align: left;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: text;
  padding: 10px;
  margin: 10px;
  line-height: 1.42857143;
  box-sizing: border-box;
  z-index: 2000;
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px' : 'auto')};

  &:disabled {
    background-color: ${(props) =>
      props.variant === 'light' ? 'ghostwhite' : 'lightgrey'};
    color: ${(props) =>
      props.variant === 'light' ? 'lightgrey' : 'ghostwhite'};
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px 0
        ${(props) =>
          props.variant === 'light'
            ? 'rgba(0,0,0,0.2)'
            : 'rgba(255,255,255,0.2)'},
      0 6px 20px 0
        ${(props) =>
          props.variant === 'light'
            ? 'rgba(0,0,0,0.2)'
            : 'rgba(255,255,255,0.2)'};
  }
`

const App = () => {
  const {
    filter,
    filterGrouped,
    SearchBox,
    SearchBoxGrouped,
    StyledSearchBox,
    StyledSearchBoxGrouped,
    returnAll
  } = useSearch()

  const [parameters, setParameters] = useState({
    component: 'hooks',
    searchType: 'strict',
    dataType: 'simple',
    searchKeys: null,
    searchDepth: null,
    minCar: null,
    fuzzySensibility: null,
    fontSize: 18,
    height: 5,
    width: 30,
    variant: 'light',
    suggestions: true
  })

  const [results, setResults] = useState()

  return (
    <div
      style={{
        padding: '2vh',
        backgroundColor: 'rgb(255,255,255)',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          padding: '2vh 2vw 2vh 2vw',
          backgroundColor: 'rgb(0,128,128,0.3)',
          borderRadius: '5px'
        }}
      >
        <h1 style={{ margin: '10px' }}>React Search Headless - live demo</h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginBottom: '5vh'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            minWidth: '40%',
            borderRight: '1px solid lightgrey',
            marginTop: '5px',
            marginBottom: '5px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '5px'
            }}
          >
            <p style={{ marginRight: '20%' }}>Component</p>
            <StyledSelect
              style={{ marginRight: '15px' }}
              value={parameters.component}
              onChange={({ target: { value } }) =>
                setParameters({ ...parameters, component: value })
              }
            >
              <option value='hooks'>Custom, using hooks</option>
              <option value='unstyled'>Unstyled Searchbox</option>
              <option value='styled'>Styled Searchbox</option>
            </StyledSelect>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '5px'
            }}
          >
            <p style={{ marginRight: '20%' }}>Search type</p>
            <StyledSelect
              style={{ marginRight: '15px' }}
              value={parameters.searchType}
              onChange={({ target: { value } }) =>
                setParameters({ ...parameters, searchType: value })
              }
            >
              <option value='strict'>Strict</option>
              <option value='fuzzy'>Fuzzy</option>
            </StyledSelect>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '5px'
            }}
          >
            <p style={{ marginRight: '20%' }}>Dataset type</p>
            <StyledSelect
              style={{ marginRight: '15px' }}
              value={parameters.dataType}
              onChange={({ target: { value } }) =>
                setParameters({ ...parameters, dataType: value })
              }
            >
              <option value='simple'>Simple</option>
              <option value='grouped'>Grouped</option>
            </StyledSelect>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '5px'
            }}
          >
            <p style={{ marginRight: '20%' }}>Search Keys</p>
            <StyledSelect
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
            </StyledSelect>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '5px'
            }}
          >
            <p style={{ marginRight: '20%' }}>Search depth</p>
            <StyledInput
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '5px'
            }}
          >
            <p style={{ marginRight: '20%' }}>Minimum characters</p>
            <StyledInput
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
          {parameters.searchType === 'fuzzy' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '5px'
              }}
            >
              <p style={{ marginRight: '20%' }}>Fuzzy sensibility</p>
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
          )}
          {parameters.component === 'styled' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '5px'
              }}
            >
              <p style={{ marginRight: '20%' }}>Variant</p>
              <StyledSelect
                style={{ marginRight: '15px' }}
                value={parameters.variant ? parameters.variant : 'light'}
                onChange={({ target: { value } }) =>
                  setParameters({
                    ...parameters,
                    variant: value === '' ? 'light' : value
                  })
                }
              >
                <option value='light'>Light</option>
                <option value='dark'>Dark</option>
              </StyledSelect>
            </div>
          )}
          {parameters.component === 'styled' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '5px'
              }}
            >
              <p style={{ marginRight: '20%' }}>Suggestions</p>
              <StyledSelect
                style={{ marginRight: '15px' }}
                value={parameters.suggestions}
                onChange={({ target: { value } }) =>
                  setParameters({
                    ...parameters,
                    suggestions: value === 'true'
                  })
                }
              >
                <option value={true}>With suggestions</option>
                <option value={false}>Without suggestions</option>
              </StyledSelect>
            </div>
          )}
          {parameters.component === 'styled' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '5px'
              }}
            >
              <p style={{ marginRight: '20%' }}>Font Size (in px)</p>
              <StyledInput
                style={{ marginRight: '15px' }}
                value={parameters.fontSize ? parameters.fontSize : 9}
                min='9'
                type='number'
                onChange={({ target: { value } }) =>
                  setParameters({
                    ...parameters,
                    fontSize: value === '' ? 9 : value
                  })
                }
              />
            </div>
          )}
          {parameters.component === 'styled' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '5px'
              }}
            >
              <p style={{ marginRight: '20%' }}>Box Height (in vh)</p>
              <StyledInput
                style={{ marginRight: '15px' }}
                value={parameters.height ? parameters.height : 5}
                min='5'
                type='number'
                onChange={({ target: { value } }) =>
                  setParameters({
                    ...parameters,
                    height: value === '' ? 5 : value
                  })
                }
              />
            </div>
          )}
          {parameters.component === 'styled' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '5px'
              }}
            >
              <p style={{ marginRight: '20%' }}>Box Width (in vw)</p>
              <StyledInput
                style={{ marginRight: '15px' }}
                value={parameters.width ? parameters.width : 5}
                min='5'
                type='number'
                onChange={({ target: { value } }) =>
                  setParameters({
                    ...parameters,
                    width: value === '' ? 5 : value
                  })
                }
              />
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: '5vh',
            flexGrow: 2,
            wordBreak: 'break-all',
            alignItems: 'center'
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
              {results && results.length > 0 && (
                <p>{`${results.length} results`}</p>
              )}
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
          {parameters.component === 'styled' &&
            parameters.dataType === 'simple' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'wrap'
                }}
              >
                <StyledSearchBox
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
                  suggestions={parameters.suggestions}
                  onFilter={(value) => {
                    setResults(value)
                  }}
                  onSelect={(value) => {
                    console.log(value)
                  }}
                  placeholder='Search anything...'
                  variant={parameters.variant}
                  height={parameters.height}
                  width={parameters.width}
                  fontSize={parameters.fontSize}
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
                  {!parameters.suggestions &&
                    (!results || results.length === 0) &&
                    returnAll(data, {
                      searchKeys: parameters.searchKeys,
                      searchDepth: parameters.searchDepth,
                      minCar: parameters.minCar,
                      fuzzySensibility: parameters.fuzzySensibility,
                      renderName: (item) => item.englishName,
                      renderMeta: (item) => item,
                      idKey: 'id'
                    }).map((itemResult, indexResult) => (
                      <StyledSuggestion
                        variant={parameters.variant}
                        fontSize={parameters.fontSize}
                        height={parameters.height}
                        width={parameters.width}
                        key={indexResult}
                        onClick={() => {}}
                      >
                        <h2>{itemResult.name}</h2>
                      </StyledSuggestion>
                    ))}
                  {!parameters.suggestions &&
                    results &&
                    results.length !== 0 &&
                    results.map((itemResult, indexResult) => (
                      <StyledSuggestion
                        variant={parameters.variant}
                        fontSize={parameters.fontSize}
                        height={parameters.height}
                        width={parameters.width}
                        key={indexResult}
                        onClick={() => {}}
                      >
                        <h2>{itemResult.name}</h2>
                      </StyledSuggestion>
                    ))}
                </div>
              </div>
            )}
          {parameters.component === 'styled' &&
            parameters.dataType === 'grouped' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'wrap'
                }}
              >
                <StyledSearchBoxGrouped
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
                  suggestions={parameters.suggestions}
                  onFilter={(value) => {
                    setResults(value)
                  }}
                  onSelect={(value) => {
                    console.log(value)
                  }}
                  placeholder='Search anything...'
                  variant={parameters.variant}
                  height={parameters.height}
                  width={parameters.width}
                  fontSize={parameters.fontSize}
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
                  {!parameters.suggestions &&
                    results &&
                    (results.planets.length !== 0 ||
                      results.satellites.length !== 0) &&
                    Object.keys(results).map(
                      (itemResult, indexResult) =>
                        results[itemResult].length > 0 &&
                        results[itemResult].map((item, index) => (
                          <StyledSuggestion
                            variant={parameters.variant}
                            fontSize={parameters.fontSize}
                            height={parameters.height}
                            width={parameters.width}
                            key={index}
                            onClick={() => {}}
                          >
                            <p>{`${itemResult}: ${item.name}`}</p>
                          </StyledSuggestion>
                        ))
                    )}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default App
