
# react-search-headless

  

> Headless React search box

  

[![NPM](https://img.shields.io/npm/v/react-search-headless.svg)](https://www.npmjs.com/package/react-search-headless) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

  

## Install

```bash

npm install --save react-search-headless

```

## Purpose

This repository provides a headless search component for React, alongside some out-of-the-box implementations of it.

It provides a bunch of core functions for running a search on a set of data with a host of parameters to control what is searched for, how and how it is returned. This lets you implement your search component UI exactly as you want it, and let the library take care of the search itself.

You can use pretty much any type of data for the search data, the library takes care of dealing with the different type of data, nested data, arrays and arrays of objects.

If you want a quick implementation instead, you can use the SearchBox component directly, with some standard styling parameters. 

<Much more to come!
  
## Methods & props

### prop: parameters
This is the core of the search, defining how you want to match the query and data. 

##### Props

Props name | Required | Type | Description
------------ | ------------- | ------------- | -------------
searchKeys | false | array | If omitted, the search will run on all keys in this object. If defined, lists the keys on which the search must be run. It allows for `.` notation, i.e.: targeting attributes lower in the object keys tree.
searchDepth | false | number | If omitted, the search will run exhaustively through the object keys tree. Allows to define how deep in the tree you want the search to run (useful in case of massive amount of deeply nested data, to improve performance). For most cases, this can be omitted.
idKey | true | string | The key to use as a unique reference for each data row returned by the search. 
renderName | true | function | A function that takes a returned data row from the search and outputs a human-readable name. Set it to `(item) => {}` if you don't want it to return anything.
renderMeta | true | function | A function that takes a returned data row from the search and outputs a metadata object. Set it to `(item) => {}` if you don't want it to return anything.

##### Implementation
```jsx
const paramSearch = {
	searchKeys: ['name', 'location.address'],
	searchDepth: 2,
	idKey:  'id',
	renderName: (item) =>  item.firstName && item.lastName,
	renderMeta: (item) =>  item,
}
```

### method: filter()

Takes a data set, search parameters and a query then returns an array of data of the form:
```jsx
[
	{
		value: `idKey provided`,
		name: `result of renderName`,
		meta: `result of renderMeta`
	},
	{
		...
	}
]
```

##### Implementation
```jsx
import { useSearch } from  'react-search-headless'

const MyComponent = () => {
	const { filter } = useSearch();

	const results = filter(data,parameters,'strict',query);
	
	{/* Do something with results */}

}
```
##### Props

Props name | Required | Type | Description
------------ | ------------- | ------------- | -------------
data | true | array | The data to run the search on. This can be any type of array, including an array of objects.
parameters | true | object | The parameters objects for the search. Defines how the search is done. See above for more details on object props.
searchType | false | string | Can be `'strict'` or `'fuzzy'`. Strict search will look for an exact match, but non-case sensitive. Fuzzy will rely on Fuse.js to identify a list of approximate matches.
query | true | string | The search string you are looking for. 

### method: filterGrouped()

Takes a data set, search parameters and a query then returns an object of the form:
```jsx
{
	planets:
	{
		[
			{
				value: `idKey provided`,
				name: `result of renderName`,
				meta: `result of renderMeta`
			},
			{
				...
			}
		]
	},
	satellites:
	{
		[
			{
				value: `idKey provided`,
				name: `result of renderName`,
				meta: `result of renderMeta`
			},
			{
				...
			}
		]
	},
}
```
where each key in the object is one of the keys provided to searchKeys, or if omitted, the initial data object.

##### Implementation
```jsx
import { useSearch } from  'react-search-headless'

const MyComponent = () => {
	const { filterGrouped } = useSearch();

	const results = filterGrouped(data,parameters,'strict',query);
	
	{/* Do something with results */}

}
```
##### Props

Props name | Required | Type | Description
------------ | ------------- | ------------- | -------------
data | true | object | The data to run the search on. This can be any type of object.
parameters | true | object of parameters prop | The parameters objects for the search, composed of one standard parameter prop object per key you want to search on. Defined how the search is done. See above for more details on object props. Example: `parameters={planets: {searchKey: ['name'], idKey: 'id', renderName: (item) => item.name, renderMeta: (item) => item}, satellites: {searchKey: ['parent'], idKey: 'id', renderName: (item) => item.name, renderMeta: (item) => item}}`
searchType | false | string | Can be `'strict'` or `'fuzzy'`. Strict search will look for an exact match, but non-case sensitive. Fuzzy will rely on Fuse.js to identify a list of approximate matches.
query | true | string | The search string you are looking for. 

## Components

### component: SearchBox

Un-styled search box that includes a suggestions list.

##### Implementation
```jsx
import { useSearch } from  'react-search-headless'

const MyComponent = () => {
	const { SearchBox } = useSearch();
	
	return(
		<SearchBox
			data={dataSearchBox}
			parameters={paramsSearchBox}
			searchType='strict'
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
```
##### Props

Props name | Required | Type | Description
------------ | ------------- | ------------- | -------------
data | true | array | The data to run the search on. This can be any type of array, including an array of objects.
parameters | true | object | The parameters objects for the search. Defines how the search is done. See above for more details on object props.
searchType | false | string | Can be `'strict'` or `'fuzzy'`. Strict search will look for an exact match, but non-case sensitive. Fuzzy will rely on Fuse.js to identify a list of approximate matches.
suggestions | true | boolean | Whether the search box displays a list of suggestions when returning a result.
onFilter | true | function | Callback executed whenever a search is conducted.
onSelect | true | function | Callback executed whenever an element is selected in the list of suggestions.

### component: SearchBoxGrouped

Un-styled search box using grouped data and that includes a suggestions list.

##### Implementation
```jsx
import { useSearch } from  'react-search-headless'

const MyComponent = () => {
	const { SearchBoxGrouped } = useSearch();
	
	return(
		<SearchBoxGrouped
			data={dataSearchBoxGrouped}
			parameters={paramsSearchBoxGrouped}
			searchType='strict'
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
```
##### Props

Props name | Required | Type | Description
------------ | ------------- | ------------- | -------------
data | true | object | The data to run the search on. This can be any type of object.
parameters | true | object of parameters prop | The parameters objects for the search, composed of one standard parameter prop object per key you want to search on. Defined how the search is done. See above for more details on object props. Example: `parameters={planets: {searchKey: ['name'], idKey: 'id', renderName: (item) => item.name, renderMeta: (item) => item}, satellites: {searchKey: ['parent'], idKey: 'id', renderName: (item) => item.name, renderMeta: (item) => item}}`
searchType | false | string | Can be `'strict'` or `'fuzzy'`. Strict search will look for an exact match, but non-case sensitive. Fuzzy will rely on Fuse.js to identify a list of approximate matches.
suggestions | true | boolean | Whether the search box displays a list of suggestions when returning a result.
onFilter | true | function | Callback executed whenever a search is conducted.
onSelect | true | function | Callback executed whenever an element is selected in the list of suggestions.

## Usage

 ### Simple search box

```jsx
import React, { useState } from 'react'
import  { useSearch }  from  'react-search-headless'

const  MyComponent = () => {

	const [results, setResults] = useState();
	const { filter } = useSearch();

	const data = {...}
	const paramsSearch = {
		idKey: 'id',
		renderName: (item) =>  item.firstName && item.lastName,
		renderMeta: (item) =>  item,
	}
	
	return(
	<input
		placeholder='Search anything...'
		onChange={({ target: { value } }) =>
			setResults(
				filter(data,paramsSearch, 'strict', value)
			)}
	/>
	{results &&
	results.length > 0 &&
	results.map((item, index) => (
		<p  key={index}>{JSON.stringify(item.metadata)}</p>
	))}
}

```

### Simple search box with named keys

```jsx
import React, { useState } from 'react'
import  { useSearch }  from  'react-search-headless'

const  MyComponent = () => {

	const [results, setResults] = useState();
	const { filter } = useSearch();

	const data = {...}
	const paramsSearch = {
		searchKeys: ['lastName'], // We are only searching on lastName
		idKey: 'id',
		renderName: (item) =>  item.firstName && item.lastName,
		renderMeta: (item) =>  item,
	}
	
	return(
	<input
		placeholder='Search anything...'
		onChange={({ target: { value } }) =>
			setResults(
				filter(data,paramsSearch, 'strict', value)
			)}
	/>
	{results &&
	results.length > 0 &&
	results.map((item, index) => (
		<p  key={index}>{JSON.stringify(item.metadata)}</p>
	))}
}

```

### Simple search box with search depth

```jsx
import React, { useState } from 'react'
import  { useSearch }  from  'react-search-headless'

const  MyComponent = () => {

	const [results, setResults] = useState();
	const { filter } = useSearch();

	const data = {...}
	const paramsSearch = {
		searchDepth: 2, // We are only searching to a depth of 2 levels across all keys, 
		//i.e.: ignoring an attribute such as data.location.address.formatted_address
		idKey: 'id',
		renderName: (item) =>  item.firstName && item.lastName,
		renderMeta: (item) =>  item,
	}
	
	return(
	<input
		placeholder='Search anything...'
		onChange={({ target: { value } }) =>
			setResults(
				filter(data,paramsSearch, 'strict', value)
			)}
	/>
	{results &&
	results.length > 0 &&
	results.map((item, index) => (
		<p  key={index}>{JSON.stringify(item.metadata)}</p>
	))}
}

```

### Grouped filter search box with complex search parameters
```jsx
import React, { useState } from 'react'
import  { useSearch }  from  'react-search-headless'

const  MyComponent = () => {

	const [results, setResults] = useState();
	const { filterGrouped } = useSearch();

	const data = {...}
	const paramsSearch = {
		planets: {
			searchDepth: 2,
			idKey: 'id',
			renderName: (item) =>  item.name,
			renderMeta: (item) =>  item,
		},
		satellites: {
			searchKeys: ['name','parent.name','mass'],
			idKey: 'id',
			renderName: (item) =>  item.name && ', satellite of ' && item.parent.name,
			renderMeta: (item) =>  item,
		}
	}
	
	return(
	<input
		placeholder='Search anything...'
		onChange={({ target: { value } }) =>
			setResults(
				filterGrouped(data,paramsSearch, 'strict', value)
			)}
	/>
	{results && (
	<div>
		{Object.keys(results).map((item, index) => {
			return (
			<div>
				<div  key={index}>
					<h1>{item}</h1>
				<div>
				{results[item].length > 0 &&
					results[item].map((itemResult, indexResult) => (
						<div
							key={indexResult}
							onClick={() => {
								console.log(JSON.stringify(itemResult))								
								setResults(null)
							}}
						>
							<p>{itemResult.name}</p>
						</div>
				))}
				{results[item].length === 0 && <p>No results</p>}
			</div>
	</div>)

```

  ## Dependencies
  
This repository relies on the brilliant library [Fuse.js](https://github.com/krisk/fuse) for the fuzzy-search logic.

## License

  

MIT © [GwenhaelG](https://github.com/GwenhaelG)