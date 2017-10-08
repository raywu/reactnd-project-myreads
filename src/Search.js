import React from 'react'
import * as _ from 'lodash'
import Book from './Book.js'
import { Link } from 'react-router-dom'

const Search = (props) => {
  const { query, updateQuery, searchResults, handleShelfChange, existingBooks } = props,
    renderBook =
      searchResults && searchResults instanceof Array && searchResults.map((book) => {
        if (existingBooks.includes(book.id)) {
          book = _.find(existingBooks, (existingBook) => ( existingBook.id === book.id ));
        }
        return <Book handleShelfChange={ handleShelfChange } key={ book.id } book={ book } />;
      });
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={ (event) => updateQuery(event.target.value) } />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          { renderBook }
        </ol>
      </div>
    </div>
  )
}

export default Search
