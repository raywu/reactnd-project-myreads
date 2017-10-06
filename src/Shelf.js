import React from 'react'
import Book from './Book.js'

class Shelf extends React.Component {

  render() {
    const shelf = this.props.shelf,
      shelfName = this.props.shelfName;

    if (!shelf) {
      return null;
    }

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelfName }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              shelf.map(( book ) => {
                return <Book key={ book.id } book={ book } />
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
