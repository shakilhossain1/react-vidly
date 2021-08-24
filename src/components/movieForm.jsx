import React from 'react';

const MovieForm = ({match, history}) => {
  const handleSave = () => {
    history.push('/movies');
  };
  return (
    <div>
      <h2>Movie Form - {match.params.id}</h2>
      <button className='btn btn-primary btn-sm mt-2' onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;
