import React from 'react';

const ListGroup = ({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem
}) => (
  <div className='list-group'>
    {items.map(item => (
      <a
        href='#'
        onClick={() => onItemSelect(item)}
        className={`list-group-item list-group-item-action ${selectedItem === item && 'active'}`}
        key={item[valueProperty]}
      >
        {item[textProperty]}
      </a>
    ))}
  </div>
);

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}

export default ListGroup;
