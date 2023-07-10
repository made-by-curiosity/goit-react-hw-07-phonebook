import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ContactsFilter, FilterInput } from './Filter.styled';
import { updateFilter } from 'redux/filter/slice';
import { selectFilter } from 'redux/filter/selectors';

export const Filter = ({ filterTitle }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilter = e => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <ContactsFilter>
      {filterTitle && <p>{filterTitle}</p>}
      <FilterInput type="text" value={filter} onInput={handleFilter} />
    </ContactsFilter>
  );
};

Filter.propTypes = {
  filterTitle: PropTypes.string,
};
