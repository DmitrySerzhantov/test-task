import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ElementList: FC = () => {
  const elements = useSelector((state: RootState) => state.elements.data);
  const loading = useSelector((state: RootState) => state.elements.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (elements.length === 0) {
    return <div>No elements found.</div>;
  }
  return (
    <ul className='elements-list'>
      {elements.map((element) => (
        <li key={element.id}>
          <h3>{element.title}</h3>
          <img alt='#' src={element.thumbnailUrl}></img>
        </li>
      ))}
    </ul>
  );
};

export default ElementList;
