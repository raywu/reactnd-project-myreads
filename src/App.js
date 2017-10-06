import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import './App.css'
import Book from './Book.js'

class BooksApp extends React.Component {
  state = {
    shelf: {},
    books: {},
    query: '',
    searchResults: [],
  };

  updateQuery = (value) => {
    this.setState({ query: value.trim() });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const shelf =
        books.reduce((shelf, book) => {
          if ( book && book.shelf ) {
            shelf[book.shelf] ?
              shelf[book.shelf].push(book) :
              shelf[book.shelf] = [ book ];
          }
          return shelf;
        }, {})
      this.setState({ books, shelf });
    })
  }

  render() {
    const { query, books, shelf, searchResults } = this.state,
      // TODO: parse ../SEARCH_TERMS.md directly
      searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey',     'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
      ];
    let match, searchQuery;

    if (query) {
      match = new RegExp(escapeRegExp(query), 'i');
      searchQuery = searchTerms.filter((term) => match.test(term));
    }

    if (searchQuery && searchQuery.length === 1) {
      BooksAPI.search(searchQuery[0]).then((books) => {
        this.setState( { searchResults: books } );
      });
    }

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  searchResults && searchResults.map((book) => {
                    return <Book key={ book.id } book={ book } />
                  })
                }
              </ol>
            </div>
          </div>
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        shelf && shelf.currentlyReading && shelf.currentlyReading.map(( book ) => {
                          return <Book key={ book.id } book={ book } />
                        })
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        shelf && shelf.wantToRead && shelf.wantToRead.map(( book ) => {
                          return <Book key={ book.id } book={ book } />
                        })
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        shelf && shelf.read && shelf.read.map(( book ) => {
                          return <Book key={ book.id } book={ book } />
                        })
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to={`/search`}>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
