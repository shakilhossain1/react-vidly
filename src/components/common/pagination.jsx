import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagintaion = ({itemsCount, onPageChange, pageSize, currentPage}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className='pagination'>
        {pages.map(page => (
          <li
            className={`page-item ${currentPage === page && 'active'}`}
            key={page}
          >
            <a
              className='page-link'
              href='#'
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagintaion.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagintaion;
