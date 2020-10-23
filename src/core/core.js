// Import modules
//import Fuse from 'fuse.js'

/* --  Utilities -- */

// Return type and value of object
const typeAndValue = (object) => {
  try {
    switch (typeof object) {
      case 'number':
        return { type: 'number', value: object.toString() }
      case 'boolean':
        return { type: 'boolean', value: object }
      case 'object':
        switch (Object.prototype.toString.call(object)) {
          case '[object Object]':
            return { type: 'object', value: object }
          case '[object Array]':
            return { type: 'array', value: object }
          case '[object Date]':
            return { type: 'date', value: object }
          case '[object Math]':
            return { type: 'math', value: object }
          case '[object Null]':
            return { type: 'null', value: object }
          default:
            return object
        }
      default:
        return { type: 'string', value: object }
    }
  } catch (err) {
    console.error(err.message)
  }
}

// Analyse the tree, checking for additional depth, and for type and value, whether there is a given path or not
const getProp = (object, path) => {
  try {
    if (!path) {
      return typeAndValue(object)
    } else {
      if (path.indexOf('.') === -1) {
        return typeAndValue(object[path])
      } else {
        if (object[path.split('.')[0]])
          return getProp(object[path.split('.')[0]], path.split('.').slice(1))
        else {
          object[path.split('.')[0]] = {}
          return getProp(object[path.split('.')[0]], path.split('.').slice(1))
        }
      }
    }
  } catch (err) {
    console.error(err.message)
  }
}

// Test the object and return an array of true or false, one entry per object tested
const testObject = (query, dataItem, searchKeyItem, searchDepth) => {
  try {
    const prop = getProp(dataItem, searchKeyItem)
    switch (prop.type) {
      case 'number':
        return prop.value.toLowerCase().indexOf(query.toLowerCase()) !== -1
          ? true
          : false
      case 'string':
        return prop.value.toLowerCase().indexOf(query.toLowerCase()) !== -1
          ? true
          : false
      case 'object':
        return searchDepth > 0
          ? Object.keys(prop.value)
              .map((searchKeyItem) =>
                testObject(
                  query,
                  prop.value,
                  searchKeyItem,
                  searchDepth ? searchDepth - 1 : 1
                )
              )
              .includes(true)
            ? true
            : false
          : false
      case 'array':
        return searchDepth > 0
          ? prop.value
              .map((dataItem) =>
                testObject(
                  query,
                  dataItem,
                  null,
                  searchDepth ? searchDepth - 1 : 1
                )
              )
              .includes(true)
            ? true
            : false
          : false
      default:
        return false
    }
  } catch (err) {
    console.error(err.message)
  }
}

export const filter = (data, parameters, searchType, query) => {
  try {
    let filteredData
    switch (searchType) {
      case 'strict':
        filteredData = data
          .filter((dataItem) => {
            let testPassed
            parameters.searchKeys
              ? (testPassed = parameters.searchKeys.map(
                  (searchKeyItem) =>
                    query && testObject(query, dataItem, searchKeyItem)
                ))
              : (testPassed = Object.keys(dataItem).map(
                  (searchKeyItem) =>
                    query &&
                    testObject(
                      query,
                      dataItem,
                      searchKeyItem,
                      parameters.searchDepth
                    )
                ))
            return testPassed.includes(true) ? true : false
          })
          .map((itemMap) => ({
            value: itemMap[parameters.idKey],
            name: parameters.renderName(itemMap),
            metadata: parameters.renderMeta(itemMap)
          }))
        break
      default:
        break
    }
    return filteredData
  } catch (err) {
    console.error(err.message)
  }
}

// Parse query and return filtered results as groups
export const filterGrouped = (data, parameters, searchType, query) => {
  try {
    // Filter the data set by keys provided
    const dataKeys = Object.keys(data)
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
                  let testPassed
                  parameters[item].searchKeys
                    ? (testPassed = parameters[item].searchKeys.map(
                        (searchKeyItem) =>
                          query && testObject(query, dataItem, searchKeyItem)
                      ))
                    : (testPassed = Object.keys(dataItem).map(
                        (searchKeyItem) =>
                          query &&
                          testObject(
                            query,
                            dataItem,
                            searchKeyItem,
                            parameters[item].searchDepth
                          )
                      ))
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
      /*case 'fuzzy':
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
        break*/
      default:
        break
    }
    return filteredData
  } catch (err) {
    console.error(err.message)
  }
}

// Return all results
export const returnAll = (data, parameters) => {
  try {
    let filteredData
    filteredData = data[item].map((itemMap) => ({
      value: itemMap[parameters[item].idKey],
      name: parameters[item].renderName(itemMap),
      metadata: parameters[item].renderMeta(itemMap)
    }))
    return filteredData
  } catch (err) {
    console.error(err.message)
  }
}

// Return all results - grouped
export const returnAllGrouped = (data, parameters) => {
  try {
    let filteredData = {}
    Object.keys(data).forEach((item) => {
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
    return filteredData
  } catch (err) {
    console.error(err.message)
  }
}
