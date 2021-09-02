import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { register } from '../services/userService'
import auth from '../services/authService';
import { Redirect } from 'react-router-dom';

class RegisterForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
      name: '',
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(6).max(20).label('Password'),
    name: Joi.string().required().max(30).label('Name'),
  };

  doSubmit = async () => {
    try {
      const res = await register(this.state.data);
      auth.loginWithJWT(res.headers['x-auth-token']);
      window.location = '/';
    }
    catch(ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    if (auth.currentUser()) return <Redirect to='/' />;
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Submit')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
