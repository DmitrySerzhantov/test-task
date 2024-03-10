import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchElements } from '../../store/elementsSlice';
import { AppDispatch } from '../../store/store';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(searchElements(searchTerm));
  };

  return (
    <div className='search-bar'>
      <input className='search-bar__input' type="text" value={searchTerm} onChange={handleChange} />
      <button className='search-bar__button' onClick={handleSubmit}>ПОИСК</button>
    </div>
  );
};

export default SearchBar;
