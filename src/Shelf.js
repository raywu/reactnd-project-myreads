import React from 'react'
import Book from './Book.js'

const Shelf = (props) => {
  const shelf = props.shelf,
    shelfName = props.shelfName;
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
              return <Book key={ book.id } handleShelfChange={ props.handleShelfChange } book={ book } />
            })
          }
        </ol>
      </div>
    </div>
  )
}

export default Shelf
