import React from 'react'
import * as _ from 'lodash'
import Shelf from './Shelf.js'

class Shelves extends React.Component {

  render() {
    const shelves = this.props.shelves;

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
                handleShelfChange={ this.props.handleShelfChange }
                shelfName={ _.startCase(shelfNameCamelCase) }
                shelf={ shelves && shelves[shelfNameCamelCase] } />
            )
          })
        }
      </div>
    )
  }
}

export default Shelves
