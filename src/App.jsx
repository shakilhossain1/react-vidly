import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Movies from './components/movies';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';

class App extends Component {
  state = {};
  render() {
    return (
      <>
      <ToastContainer />
        <NavBar />
        <main className='container pt-4'>
          <Switch>
            <Route path='/movies/:id' component={MovieForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/movies' component={Movies} />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
