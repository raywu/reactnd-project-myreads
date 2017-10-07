import React from 'react'
import Book from './Book.js'
import { Link } from 'react-router-dom'

class Search extends React.Component {

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.props.query}
              onChange={ (event) => this.props.updateQuery(event.target.value) } />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.props.searchResults && this.props.searchResults.map((book) => {
                return <Book handleShelfChange={this.props.handleShelfChange} key={ book.id } book={ book } />
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
