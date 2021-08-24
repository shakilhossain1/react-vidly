import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
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

  doSubmit = () => {
    alert('submited register form')
  };

  render() {
    const {data, errors} = this.state;
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

export default LoginForm;
