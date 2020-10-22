# react-search-headless

> Headless React search box

[![NPM](https://img.shields.io/npm/v/react-search-headless.svg)](https://www.npmjs.com/package/react-search-headless) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-search-headless
```

## Usage

```jsx
import React, { Component } from 'react'

import SearchBox from 'react-search-headless'

class Example extends Component {
  render() {
    return (
      <SearchBox
        searchType='fuzzy'
        data={dataSearch}
        parameters={paramsSearch}
        suggestions={true}
        onFilter={(value) => {
          console.log('filter')
          //console.log('Set Filtered Data to: ' && JSON.stringify(value))
        }}
        onSelect={(group, value) => {
          console.log('select')
          /*console.log(
              'Set Selected Item from Group: ' &&
                group &&
                ' is: ' &&
                JSON.stringify(value)
            )*/
        }}
      />
    )
  }
}
```

## License

MIT © [GwenhaelG](https://github.com/GwenhaelG)
