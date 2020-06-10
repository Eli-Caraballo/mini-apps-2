import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previous: '',
      search: '',
      events: [],
      offset: 0,
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  submitSearch(value) {
    axios.get(`/events?q=${value}`, {data: {limit: this.props.perPage, offset: this.state.offset}})
      .then((data) => {
        this.setState({
          events: data.data,
          pageCount: Math.ceil(data.data.length / 10),
          previous: value
        })
      })
      .then(() => {
        this.setState({
          search: ''
        })
      })
  }

  next() {
    axios.get(`/events?q=${this.state.previous}`, {data: {limit: this.props.perPage, offset: this.state.offset }})
    .then((data) => {
      this.setState({
        events: data.data,
        pageCount: Math.ceil(data.data.length / 10),
      })
    })
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);

    this.setState({ offset: offset }, () => {
      this.next();
    });
  };

  render() {
    return (
      <div>
        <h1>Search A Historical Event!</h1>
        <div>
          <input type="text" value={this.state.search} id="search" onChange={(e) => { this.handleChange(e) }}></input>
          <button type="button" onClick={() => { this.submitSearch(this.state.search) }}>Search</button>
        </div>
        {
          this.state.events.map((event) => {
            return (
              <div>
                <div>Date-{event.date}: ${event.description}</div>
                <br />
              </div>
            )
          })
        }
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick.bind(this)}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
