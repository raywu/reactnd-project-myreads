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
      const shelves = this.groupBooks(books);
      this.setState({ books, shelves });
    })
  }

  // updateShelves(books) {
  //   const shelves = this.groupBooks(books);
  //   this.setState({ shelves });
  // }

  handleShelfChange(book, event) {
    // const targetShelf = event.target.value,
    //   searchResults = this.state.searchResults;
    // let existingBooks = this.state.books;
    //
    // BooksAPI.update(book, targetShelf).then((newShelves) => {
    //   // TODO: use newShelves
    //   if (existingBooks.includes(book)) {
    //     _.find(existingBooks, (eb) => { return eb === book }).shelf = targetShelf;
    //     this.updateShelves(existingBooks)
    //   } else {
    //     const newBook = _.find(searchResults, (srb) => { return srb === book })
    //     newBook.shelf = targetShelf;
    //     existingBooks.push(newBook);
    //     this.updateShelves(existingBooks);
    //   }
    // });

    const targetShelf = event.target.value;
    BooksAPI.update(book, targetShelf).then((newShelves) => {
      this.loadBooks();
    });
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
