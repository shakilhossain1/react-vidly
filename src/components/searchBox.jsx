import React from 'react';
import Input from './common/input';

const SearchBox = ({searchQuery, onChange}) => {
  return (
    <Input
      name='search'
      value={searchQuery}
      placeholder="Search whatever..."
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
