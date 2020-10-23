// Import modules
import React, { useMemo } from 'react'
import { filter, filterGrouped, returnAll, returnAllGrouped } from './core/core'
import SearchBox from './components/SearchBox'
import SearchBoxGrouped from './components/SearchBoxGrouped'

/*  ---  Headless component  ---  */
export const useSearch = () => {
  return useMemo(
    () => ({
      filter: (...p) => filter(...p),
      filterGrouped: (...p) => filterGrouped(...p),
      returnAll: (...p) => returnAll(...p),
      returnAllGrouped: (...p) => returnAllGrouped(...p),
      SearchBox: ({ ...p }) => <SearchBox {...p} />,
      SearchBoxGrouped: ({ ...p }) => <SearchBoxGrouped {...p} />,
      Suggestions: ({ ...p }) => <Suggestions {...p} />,
      StyledSuggestions: ({ ...p }) => <StyledSuggestions {...p} />
    }),
    []
  )
}
