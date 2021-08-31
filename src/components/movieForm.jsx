import React, {Component} from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import {toast} from 'react-toastify';
import {getGenres} from '../services/genreService';
import {saveMovie, getMovie} from '../services/movieService';

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

  async populateGenres() {
    const {data: genres} = await getGenres();
    this.setState({genres});
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId == 'new') return;

      const {data: movie} = await getMovie(movieId);
      this.setState({data: this.mapToViewModel(movie)});
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('Movie are you looking for could not found');
        this.props.history.replace('/not-found');
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(30).required().label('Number In Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
  };

  doSubmit = async () => {
    const res = await saveMovie(this.state.data);
    console.log(res);
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
