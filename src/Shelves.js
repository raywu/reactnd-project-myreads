import React from 'react'
import * as _ from 'lodash'
import Shelf from './Shelf.js'

const Shelves = (props) => {
  const shelves = props.shelves;
  if (!shelves) {
    return null;
  }
  return (
    <div>
      {
        Object.keys(shelves).map((shelfNameCamelCase) => {
          return (
            <Shelf
              key={ shelfNameCamelCase }
              handleShelfChange={ props.handleShelfChange }
              shelfName={ _.startCase(shelfNameCamelCase) }
              shelf={ shelves && shelves[shelfNameCamelCase] } />
          )
        })
      }
    </div>
  )
}

export default Shelves
