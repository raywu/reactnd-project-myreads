import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import './App.css'
import Search from './Search.js'
import Main from './Main.js'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleShelfChange = this.handleShelfChange.bind(this); // this binds handleShelfChange to App.js, followed explanation from https://stackoverflow.com/questions/37795133/react-setstate-between-components-es6
  }

  state = {
    shelves: {},
    books: {},
    query: '',
    searchResults: [],
  };

  reload() {
    BooksAPI.getAll().then((books) => {
      const shelves =
        books.reduce((shelves, book) => {
          if ( book && book.shelf ) {
            shelves[book.shelf] ?
              shelves[book.shelf].push(book) :
              shelves[book.shelf] = [ book ];
          }
          return shelves;
        }, {})
      this.setState({ books, shelves });
    })
  }

  handleShelfChange(book, event) {
    BooksAPI.update(book, event.target.value).then((shelves) => {
      this.reload();
    });
  }

  searchBooks(searchQuery) {
    BooksAPI.search(searchQuery).then((books) => {
      this.setState( { searchResults: books } );
    });
  }

  updateQuery = (value) => { // followed example from https://github.com/udacity/reactnd-contacts-complete/blob/master/src/ListContacts.js
    this.setState({ query: value.trim() });
  }

  componentDidMount() {
    this.reload();
  }

  render() {
    const { query, shelves, searchResults } = this.state,
      // TODO: parse ../SEARCH_TERMS.md directly
      searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey',     'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
      ];
    let match, searchQuery;

    if (query) {
      match = new RegExp(escapeRegExp(query), 'i');
      searchQuery = searchTerms.filter((term) => match.test(term));
    }

    if (searchQuery && searchQuery.length === 1) {
      this.searchBooks(searchQuery[0]);
    }

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search
            searchResults={ searchResults }
            handleShelfChange={ this.handleShelfChange }
            updateQuery={ this.updateQuery }
            query={ query } />
        )} />
        <Route exact path="/" render={() => (
          <Main
            handleShelfChange={ this.handleShelfChange }
            shelves={ shelves } />
        )} />
      </div>
    )
  }
}

export default BooksApp
