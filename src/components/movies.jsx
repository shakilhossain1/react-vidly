import React, {Component} from 'react';
import {getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import pagintate from '../utils/pagintate';
import Like from './common/like';
import Pagintaion from './common/pagination';
import ListGroup from './common/listGroup';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenere: null,
  };

  componentDidMount() {
    const genres = [{name: 'All Genres'}, ...getGenres()];
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
    console.log('changing the page >> ', page);
    this.setState({currentPage: page});
  };

  handelGenreSelect = genre => {
    this.setState({selectedGenere: genre, currentPage: 1});
  };

  render() {
    const {
      movies: allMovies,
      currentPage,
      selectedGenere,
      pageSize,
    } = this.state;

    const filtered =
      selectedGenere && selectedGenere._id
        ? allMovies.filter(m => m.genre._id === selectedGenere._id)
        : allMovies;
    const {length: count} = filtered;

    const movies = pagintate(filtered, currentPage, pageSize);

    if (count === 0) return <p>There are no movie in the database</p>;

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
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => this.handleDelete(movie)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
