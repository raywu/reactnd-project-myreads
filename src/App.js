import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as _ from 'lodash'
import './App.css'
import Search from './Search.js'
import Main from './Main.js'
import NoMatch from './NoMatch.js'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.updateQuery = this.updateQuery.bind(this); // this binds updateQuery to BooksApp
    this.handleShelfChange = this.handleShelfChange.bind(this); // this binds handleShelfChange to App.js, followed explanation from https://stackoverflow.com/questions/37795133/react-setstate-between-components-es6
  }

  state = {
    books: {},
    query: '',
    searchResults: [],
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

  loadBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  // per code review's suggestion,
  // this filters out the updated book, then adds that same book with the updated shelf to the end of books.
  // this implementation is a lot snappier!
  handleShelfChange = (book, event) => {
    const shelf = event.target.value; // cache synthetic event
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState((previousState) => (
        { books: previousState.books.filter((b)=> (b.id !== book.id)).concat([ book ]) }
      ))
    })
  }
  searchBooks(searchQuery) {
    BooksAPI.search(searchQuery).then((books) => {
      this.setState( { searchResults: books } );
    });
  }

  // followed updateQuery example from https://github.com/udacity/reactnd-contacts-complete/blob/master/src/ListContacts.js
  // good explanation of lodash debounce vs throttle https://css-tricks.com/debouncing-throttling-explained-examples/
  updateQuery = (value) => {
    const self = this,
      debounceSearch = (() => {
        self.searchBooks(self.state.query);
      });
    this.setState({
      query: value.replace(/\W/g, ' ').trim(),
    });
    _.debounce(debounceSearch, 1000);
  }

  componentDidMount() {
    this.loadBooks();
  }

  render() {
    const { query, searchResults, books } = this.state,
      shelves = books.length > 0 ? this.groupBooks(books) : null;

    if (query) {
      this.searchBooks(query); // TODO: examine performance issue; callbacks make key stroke changes slow
    }

    return (
      <div className="app">
        <Switch>
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
          <Route component={ NoMatch } />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
