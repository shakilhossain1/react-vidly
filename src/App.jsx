import React, {Component} from 'react';
import Movies from './components/movies';

class App extends Component {
  state = {};
  render() {
    return (
      <main className='container pt-4'>
        <Movies />
      </main>
    );
  }
}

export default App;
