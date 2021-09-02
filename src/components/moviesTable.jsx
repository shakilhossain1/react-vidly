import React, {Component} from 'react';
import Like from './common/like';
import auth from '../services/authService';
import Table from './common/table';
import {Link} from 'react-router-dom';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
    },
    {path: 'genre.name', label: 'Genre'},
    {path: 'numberInStock', label: 'Stock'},
    {path: 'dailyRentalRate', label: 'Rate'},
    {
      key: 'like',
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
    key: 'delete',
    content: movie => (
      <button
        className='btn btn-danger btn-sm'
        onClick={() => this.props.onDelete(movie)}
      >
        delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.currentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const {movies, sortColumn, onSort} = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
