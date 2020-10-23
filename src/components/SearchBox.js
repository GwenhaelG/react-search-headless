import React, { useState, useRef } from 'react'

// Unstyled component
const SearchBox = ({
  data,
  parameters,
  suggestions,
  onFilter,
  onSelect,
  searchType,
  version
}) => {
  const [results, setResults] = useState()
  const [value, setValue] = useState('')
  const divRef = useRef(null)

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
      let filteredData = {}

      if (query) {
        filteredData = filterGrouped(data, parameters, searchType, query)
      } else {
        filteredData = returnAll(data, parameters)
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
      <input
        version={version}
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
        <div>
          {Object.keys(results).map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <h1>{item}</h1>
                </div>
                <div>
                  {results[item].length > 0 &&
                    results[item].map((itemResult, indexResult) => (
                      <div
                        key={indexResult}
                        onClick={() => {
                          onSelect(item, itemResult)
                          setResults(null)
                        }}
                      >
                        <p>{itemResult.name}</p>
                      </div>
                    ))}
                  {results[item].length === 0 && <p>No results</p>}
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
