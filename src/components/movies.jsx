import React, {Component} from 'react';
import {getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import pagintate from '../utils/pagintate';
import Pagintaion from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenere: null,
    sortColumn: {path: 'title', order: 'asc'},
  };

  componentDidMount() {
    const genres = [{_id: '', name: 'All Genres'}, ...getGenres()];
    this.setState({movies: getMovies(), genres});
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);

    this.setState({movies});
  };

  handlePageChange = page => {
    this.setState({currentPage: page});
  };

  handelGenreSelect = genre => {
    this.setState({selectedGenere: genre, currentPage: 1});
  };

  handleSort = sortColumn => {
    this.setState({sortColumn});
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      selectedGenere,
      pageSize,
      sortColumn,
    } = this.state;

    if (allMovies.length === 0)
      return <p>There are no movie in the database</p>;

    const filtered =
      selectedGenere && selectedGenere._id
        ? allMovies.filter(m => m.genre._id === selectedGenere._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);

    const {length: count} = filtered;

    const movies = pagintate(sorted, currentPage, pageSize);

    return (
      <div className='row'>
        <div className='col-2'>
          <ListGroup
            items={this.state.genres}
            selectedItem={selectedGenere}
            onItemSelect={this.handelGenreSelect}
          />
        </div>
        <div className='col'>
          <p>Showing {count} movies in database</p>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            onLike={this.handleLike}
            sortColumn={sortColumn}
          />
          <Pagintaion
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
