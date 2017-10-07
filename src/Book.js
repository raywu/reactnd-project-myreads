import React from 'react'

class Book extends React.Component {

  render() {
    const book = this.props.book;

    if (!book) {
      return null;
    } else if ( book && !book.shelf ) {
      book.shelf = "none";
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={
                {
                  width: 128,
                  height: 193,
                  backgroundImage: book && book.imageLinks && book.imageLinks.smallThumbnail ?
                    'url(' + book.imageLinks.smallThumbnail + ')' :
                    null
                }
            } />
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={ this.props.handleShelfChange.bind(this, book) }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ book && book.title }</div>
          <div className="book-authors">{ book && book.authors && book.authors.join(', ') }</div>
        </div>
      </li>
    )
  }
}

export default Book
