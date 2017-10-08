import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => (
  <div className="">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="">
      <Link className="close-search" to="/">Close</Link>
    </div>
    <div style={
        {
          margin: 'auto',
          width: '75%',
          border: '3px solid green',
          fontSize: 36,
          padding: '5%',
        }
      }>
      <Link to={`/`} style={ { margin: 'auto' } }>Looking for MyReads?</Link>
    </div>
  </div>
);

export default NoMatch
