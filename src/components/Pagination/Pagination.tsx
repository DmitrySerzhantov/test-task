import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchElements } from '../../store/elementsSlice';

const Pagination: FC = () => {
  const loading = useSelector((state: RootState) => state.elements.loading);
  const elements = useSelector((state: RootState) => state.elements.data);

  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector((state: RootState) => state.elements.currentPage);

  const handlePrevPage = () => {
    dispatch(fetchElements(currentPage - 1));
  };

  const handleNextPage = () => {
    dispatch(fetchElements(currentPage + 1));
  };
  if (loading) {
    return
  }
  if (elements.length === 0) {
    return
  }
  return (
    <div className='pagination'>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>Предыдущая страница</button>
      <span>Страница {currentPage}</span>
      <button disabled={elements.length < 10} onClick={handleNextPage}>Следующая страница</button>
    </div>
  );
};

export default Pagination;
