import React, { useState, useRef } from 'react'
import { filterGrouped, returnAllGrouped } from '../core/core'
import styled from 'styled-components'

const StyledBox = styled.input`
  font-family: 'Arial';
  background-color: ${(props) =>
    props.variant === 'light' ? 'white' : 'black'};
  color: ${(props) => (props.variant === 'light' ? 'black' : 'white')};
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 0;
  text-align: left;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: text;
  border: 1px solid
    ${(props) => (props.variant === 'light' ? 'black' : 'white')};
  padding: 6px 12px;
  font-size: 0.875rem;
  line-height: 1.42857143;
  box-sizing: border-box;
  width: 100%;
  min-height: ${(props) => (props.height ? props.height + 'vh' : 'auto')};
  min-width: ${(props) => (props.width ? props.width + 'vw' : 'auto')};
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px' : 'auto')};

  &:disabled {
    background-color: ${(props) =>
      props.variant === 'light' ? 'ghostwhite' : 'lightgrey'};
    color: ${(props) =>
      props.variant === 'light' ? 'lightgrey' : 'ghostwhite'};
  }

  &:hover {
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

const StyledSuggestions = styled.div`
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
  border: 1px solid
    ${(props) => (props.variant === 'light' ? 'black' : 'white')};
  padding: 10px;
  line-height: 1.42857143;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: ${(props) => (props.height ? props.height + 'vh' : 'auto')};
  max-height: 50vh;
  min-width: ${(props) => (props.width ? props.width + 'vw' : 'auto')};
  z-index: 2000;
  overflow-y: scroll;
  font-size: ${(props) => (props.fontSize ? props.fontSize + 'px' : 'auto')};

  &:disabled {
    background-color: ${(props) =>
      props.variant === 'light' ? 'ghostwhite' : 'lightgrey'};
    color: ${(props) =>
      props.variant === 'light' ? 'lightgrey' : 'ghostwhite'};
  }
`

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

const StyledTitle = styled.h1`
  border-bottom: 1px solid black;
`

// Styled component
const StyledSearchBoxGrouped = ({
  data,
  parameters,
  suggestions,
  onFilter,
  onSelect,
  searchType,
  variant,
  height,
  width,
  fontSize,
  placeholder
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
        filteredData = returnAllGrouped(data, parameters)
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
      style={{
        height: `${height}vh`,
        width: `${width}vw`,
        position: 'relative'
      }}
    >
      <StyledBox
        variant={variant}
        fontSize={fontSize}
        height={height}
        width={width}
        type='search'
        value={value}
        onChange={({ target: { value } }) => {
          handleChange(value)
        }}
        onFocus={({ target: { value } }) => {
          handleChange(value)
        }}
        placeholder={placeholder}
      />
      {results && suggestions && (
        <StyledSuggestions
          variant={variant}
          fontSize={fontSize}
          height={height}
          width={width}
        >
          {Object.keys(results).map((item, index) => {
            return (
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                key={index}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <StyledTitle>{item}</StyledTitle>
                  {results[item].length > 0 &&
                    results[item].map((itemResult, indexResult) => (
                      <StyledSuggestion
                        variant={variant}
                        fontSize={fontSize}
                        height={height}
                        width={width}
                        key={indexResult}
                        onClick={() => {
                          onSelect(itemResult)
                          setResults(null)
                        }}
                      >
                        <p>{itemResult.name}</p>
                      </StyledSuggestion>
                    ))}
                  {results[item].length === 0 && <p>No results</p>}
                </div>
              </div>
            )
          })}
        </StyledSuggestions>
      )}
    </div>
  )
}

export default StyledSearchBoxGrouped
