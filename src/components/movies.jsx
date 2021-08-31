import React, {Component} from 'react';
import {getMovies, deleteMovie} from '../services/movieService';
import {getGenres} from '../services/genreService';
import {toast} from 'react-toastify';
import pagintate from '../utils/pagintate';
import Pagintaion from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import SearchBox from './searchBox';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    searchQuery: '',
    pageSize: 4,
    currentPage: 1,
    selectedGenere: null,
    sortColumn: {path: 'title', order: 'asc'},
  };

  async componentDidMount() {
    const {data} = await getGenres();
    const genres = [{_id: '', name: 'All Genres'}, ...data];
    const {data: movies} = await getMovies();
    this.setState({movies, genres});
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
  };

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({movies});

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast.error('This movie already deleted');
      this.setState({movies: originalMovies});
    }
  };

  handlePageChange = page => {
    this.setState({currentPage: page});
  };

  handelGenreSelect = genre => {
    this.setState({selectedGenere: genre, currentPage: 1, searchQuery: ''});
  };

  handleSort = sortColumn => {
    this.setState({sortColumn});
  };

  handleSearch = query => {
    this.setState({searchQuery: query, selectedGenere: null, currentPage: 1});
  };

  getPageData = () => {
    const {selectedGenere, movies: allMovies, sortColumn, currentPage, pageSize, searchQuery} = this.state;
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()));
    } else if (selectedGenere && selectedGenere._id) {
      filtered = allMovies.filter(m => m.genre._id === selectedGenere._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);
    const movies = pagintate(sorted, currentPage, pageSize);

    return {data: movies, moviesCount: filtered.length};
  };

  render() {
    const {movies: allMovies, currentPage, selectedGenere, pageSize, sortColumn} = this.state;

    if (allMovies.length === 0) return <p>There are no movie in the database</p>;

    const {data: movies, moviesCount} = this.getPageData();

    return (
      <div className='row'>
        <div className='col-2'>
          <ListGroup items={this.state.genres} selectedItem={selectedGenere} onItemSelect={this.handelGenreSelect} />
        </div>
        <div className='col'>
          <Link to='/movies/new' className='btn btn-primary my-2'>
            New Movie
          </Link>
          <p>Showing {moviesCount} movies in database</p>
          <SearchBox searchQuery={this.state.searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            onLike={this.handleLike}
            sortColumn={sortColumn}
          />
          <Pagintaion itemsCount={moviesCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}

export default Movies;
