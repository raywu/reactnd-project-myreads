import React from 'react'
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
          shelves.map((shelf) => {
            return <Shelf key={ shelf.shelfName } handleShelfChange={ this.props.handleShelfChange } shelfName={shelf && shelf.shelfName} shelf={ shelf && shelf.shelf } />
          })
        }
      </div>
    )
  }
}

export default Shelves
