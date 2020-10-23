import styled from 'styled-components'

/*  ---  Fully-styled searchbox  ---  */
// Styles
const SearchBoxWithStyling = styled.input`
  font-family: 'Arial';
  background-color: white;
  color: ${(props) => (props.version === 'light' ? 'black' : 'white')};
  background-color: ${(props) =>
    props.version === 'light' ? 'white' : 'black'};
  border-radius: 20px;
  border-color: ${(props) =>
    props.version === 'light' ? 'lightgrey' : 'darkgrey'};
  display: inline-block;
  margin-bottom: 0;
  text-align: left;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: text;
  border: 1px solid
    ${(props) => (props.version === 'light' ? 'black' : 'white')};
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

// Styled suggestions
const StyledSuggestions = ({ results, onSelect }) => {
  return (
    <div
      style={{
        maxHeight: '50vh',
        overflow: 'visible',
        overflowY: 'scroll',
        zIndex: 2000,
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '5px'
      }}
    >
      {Object.keys(results).map((item, index) => {
        return (
          <div key={index}>
            <div
              style={{
                borderBottom: '1px solid black',
                backgroundColor: 'white',
                marginTop: '5px'
              }}
            >
              <h1
                style={{
                  margin: '2px'
                }}
              >
                {item}
              </h1>
            </div>
            <div
              style={{
                backgroundColor: 'white',
                marginTop: '5px'
              }}
            >
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
  )
}
