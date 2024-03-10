import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface Element {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
}

interface ElementsState {
  data: Element[];
  loading: boolean;
  currentPage: number;
}

const initialState: ElementsState = {
  data: [],
  loading: false,
  currentPage: 1,
};

export const fetchElements = createAsyncThunk(
  'elements/fetchElements',
  async (page: number = 1) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${page}`
    );
    return response.data;
  }
);

export const searchElements = createAsyncThunk(
  'elements/searchElements',
  async (searchTerm: string) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?q=${searchTerm}&_limit=10`
    );
    return response.data;
  }
);

const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchElements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchElements.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.currentPage = action.meta.arg;
      })
      .addCase(searchElements.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchElements.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.currentPage = 1;
      });
  },
});

export default elementsSlice.reducer;
