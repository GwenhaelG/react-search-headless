import React, { useState, useRef, Fragment } from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

const StyledSearchBox = styled.input`
  font-family: 'AT Surt SemiBold';
  background-color: white;
  color: black;
  border-radius: 20px;
  border-color: lightgrey;
  display: inline-block;
  margin-bottom: 0;
  text-align: left;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: text;
  border: 1px solid black;
  padding: 6px 12px;
  font-size: 0.875rem;
  line-height: 1.42857143;
  box-sizing: border-box;
  width: 100%;
  font-size: ${(props) => (props.size ? props.size * 18 + 'px' : 'auto')};

  &:disabled {
    background-color: ${(props) =>
      props.version === 'light' ? 'lightgrey' : 'black'};
    color: ${(props) => (props.version === 'light' ? 'lightgrey' : 'black')};
  }

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  }
`

const SearchBox = ({
  data,
  parameters,
  suggestions,
  onFilter,
  onSelect,
  searchType
}) => {
  const [results, setResults] = useState()
  const [value, setValue] = useState('')
  const divRef = useRef(null)

  const getProp = (object, path) => {
    if (path.indexOf('.') === -1) {
      return typeof object[path] === 'number'
        ? object[path].toString()
        : object[path]
    } else {
      if (object[path.split('.')[0]])
        return getProp(object[path.split('.')[0]], path.split('.').slice(1))
      else {
        object[path.split('.')[0]] = {}
        return getProp(object[path.split('.')[0]], path.split('.').slice(1))
      }
    }
  }

  const parseQuery = (query, dataKeys) => {
    try {
      let filteredData = {}
      switch (searchType) {
        case 'strict':
          dataKeys.forEach((item) => {
            // If parameters available
            if (parameters[item]) {
              filteredData = {
                ...filteredData,
                [item]: data[item]
                  .filter((dataItem) => {
                    const testPassed = parameters[
                      item
                    ].searchKeys.map((searchKeyItem) =>
                      query &&
                      getProp(dataItem, searchKeyItem) &&
                      getProp(dataItem, searchKeyItem)
                        .toLowerCase()
                        .indexOf(query.toLowerCase()) !== -1
                        ? true
                        : false
                    )
                    return testPassed.includes(true) ? true : false
                  })
                  .map((itemMap) => ({
                    value: itemMap[parameters[item].idKey],
                    name: parameters[item].renderName(itemMap),
                    metadata: parameters[item].renderMeta(itemMap)
                  }))
              }
            }
          })
          break
        case 'fuzzy':
          dataKeys.forEach((key) => {
            // If parameters available
            if (parameters[key]) {
              const options = {
                includeScore: true,
                ignoreLocation: true,
                minMatchCharLength: parameters[key].minCar,
                shouldSort: true,
                keys: parameters[key].searchKeys
              }
              const fuse = new Fuse(data[key], options)
              const result = fuse.search(query)
              filteredData = {
                ...filteredData,
                [key]: result.map((itemMap) => ({
                  value: itemMap.item[parameters[key].idKey],
                  name: parameters[key].renderName(itemMap.item),
                  metadata: parameters[key].renderMeta(itemMap.item)
                }))
              }
            }
          })
          break
        default:
          break
      }
      return filteredData
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleBlur = () => {
    function handleClickOutside(event) {
      if (
        divRef.current &&
        results &&
        suggestions &&
        !divRef.current.contains(event.target)
      ) {
        setResults()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }

  const handleChange = (query) => {
    try {
      // Set the input value
      setValue(query)

      // Filter the data set by keys provided
      const dataKeys = Object.keys(data)

      let filteredData = {}

      if (query) {
        filteredData = parseQuery(query, dataKeys)
      } else {
        dataKeys.forEach((item) => {
          if (parameters[item]) {
            filteredData = {
              ...filteredData,
              [item]: data[item].map((itemMap) => ({
                value: itemMap[parameters[item].idKey],
                name: parameters[item].renderName(itemMap),
                metadata: parameters[item].renderMeta(itemMap)
              }))
            }
          }
        })
      }

      if (suggestions && query) {
        setResults(filteredData)
      } else {
        onFilter(filteredData)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div
      ref={divRef}
      onBlur={handleBlur}
      style={{ maxHeight: '5vh', height: '5vh', width: '100%' }}
    >
      <StyledSearchBox
        type='search'
        value={value}
        onChange={({ target: { value } }) => {
          handleChange(value)
        }}
        onFocus={({ target: { value } }) => {
          handleChange(value)
        }}
        placeholder={'Type anything...'}
      />
      {results && suggestions && (
        <div
          style={{
            maxHeight: '50vh',
            overflow: 'visible',
            overflowY: 'scroll',
            zIndex: 2000
          }}
        >
          {Object.keys(results).map((item, index) => {
            return (
              <div key={index} className='bg-white border-dark border-bottom'>
                <div className='border-dark border-bottom justify-content-between align-items-center'>
                  <h1>{item}</h1>
                </div>
                <div className='mt-3'>
                  {results[item].length > 0 &&
                    results[item].map((itemResult, indexResult) => (
                      <div
                        key={indexResult}
                        className='border-dark border p-2 m-2'
                        style={{ borderRadius: '20px', cursor: 'pointer' }}
                        onClick={() => {
                          onSelect(item, itemResult)
                          setResults(null)
                        }}
                      >
                        <p className='m-0'>{itemResult.name}</p>
                      </div>
                    ))}
                  {results[item].length === 0 && (
                    <p className='m-0'>No results</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBox
