import React from 'react';

const Like = ({liked, onClick}) => {
  return (
    <i
      className={`fa-heart ${liked ? 'fa' : 'far'}`}
      onClick={onClick}
      style={{cursor: 'pointer'}}
    ></i>
  );
};
export default Like;
