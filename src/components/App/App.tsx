import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { fetchElements } from '../../store/elementsSlice';
import ElementList from '../ElementList/ElementList';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import { AppDispatch } from '../../store/store';

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // При монтировании компонента загружаем первую страницу элементов
  React.useEffect(() => {
    dispatch(fetchElements(1));
  }, [dispatch]);

  return (
    <div className='App'>
      <SearchBar />
      <ElementList />
      <Pagination />
    </div>
  );
};

export default App;
