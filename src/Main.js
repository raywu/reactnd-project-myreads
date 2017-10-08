import React from 'react'
import { Link } from 'react-router-dom'
import Shelves from './Shelves.js'

const Main = (props) => {
  const shelves = props.shelves;
  if (!shelves) {
    return null;
  }
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Shelves handleShelfChange={ props.handleShelfChange } shelves={ shelves } />
      </div>
      <div className="open-search">
        <Link to={`/search`}>Add a book</Link>
      </div>
    </div>
  )
}

export default Main
