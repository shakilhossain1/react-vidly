import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import auth from './services/authService';
import ProtectedRoute from './components/common/ProtectedRoute';
import Movies from './components/movies';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import Logout from './components/logout';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({user: auth.currentUser()});
  }

  render() {
    const {user} = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className='container pt-4'>
          <Switch>
            <ProtectedRoute path='/movies/:id' component={MovieForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={RegisterForm} />
            <Route
              path='/movies'
              render={props => <Movies {...props} user={this.state.user} />}
            />
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
