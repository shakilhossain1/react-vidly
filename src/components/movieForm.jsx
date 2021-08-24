import React, {Component} from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import {getGenres} from '../services/fakeGenreService';
import {saveMovie, getMovie} from '../services/fakeMovieService';

class MovieForm extends Form {
  state = {
    genres: [],
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    errors: {},
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({genres});

    const movieId = this.props.match.params.id;
    console.log(movieId);
    if (movieId == 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found');
    this.setState({data:  this.mapToViewModel(movie) });
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(30)
      .required()
      .label('Number In Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
  };

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h2>Movie Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Nuber In mStock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
