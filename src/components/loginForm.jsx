import React from 'react';
import Input from './common/input';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = () => {
    console.log('submited');
  };

  render() {
    const {data, errors} = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {/* usernmae */}
          <Input
            name='username'
            value={data.username}
            onChange={this.handleChange}
            label='Username'
            error={errors.username}
          />
          {/* password */}
          <Input
            name='password'
            value={data.password}
            onChange={this.handleChange}
            label='Password'
            error={errors.password}
          />
          <button
            disabled={this.validate()}
            className='btn btn-primary'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
