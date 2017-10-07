import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as _ from 'lodash'
import './App.css'
import Search from './Search.js'
import Main from './Main.js'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.updateQuery = this.updateQuery.bind(this); // this binds updateQuery to BooksApp
    this.handleShelfChange = this.handleShelfChange.bind(this); // this binds handleShelfChange to App.js, followed explanation from https://stackoverflow.com/questions/37795133/react-setstate-between-components-es6
  }

  state = {
    shelves: {},
    books: {},
    query: '',
    searchResults: [],
    typingTimeout: 0,
  };

  groupBooks(books) {
    return books.reduce((shelves, book) => {
      if ( book && book.shelf && book.shelf !== 'none' ) {
        shelves[book.shelf] ?
          shelves[book.shelf].push(book) :
          shelves[book.shelf] = [ book ];
      }
      return shelves;
    }, {})
  }

  reload() {
    BooksAPI.getAll().then((books) => {
      const shelves = this.groupBooks(books);
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

  // followed updateQuery example from https://github.com/udacity/reactnd-contacts-complete/blob/master/src/ListContacts.js
  // followed setTimeout example here https://stackoverflow.com/questions/42217121/searching-in-react-when-user-stops-typing
  // TODO: keystroke performance issue still persists; there is a lag
  updateQuery = (value) => {
    if (this.state.typingTimeout) {
       clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      query: value.replace(/\W/g, ' ').trim(),
      typingTimeout: setTimeout(() => {
        this.searchBooks(this.state.query);
      }, 1000)
    });
  }

  componentDidMount() {
    this.reload();
  }

  render() {
    const { query, shelves, searchResults, books } = this.state;

    if (query) {
      this.searchBooks(query); // TODO: examine performance issue; callbacks make key stroke changes slow
    }

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search
            searchResults={ searchResults }
            handleShelfChange={ this.handleShelfChange }
            updateQuery={ this.updateQuery }
            query={ query }
            existingBooks={ books } />
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
