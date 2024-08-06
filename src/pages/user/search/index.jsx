import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Products from '../../../components/user/products';

const Search = () => {
  const { searchTerm } = useParams();
  const term = useSelector((state) => state.search.term);

  return (
    <div>
      <h1>Search Results for: {searchTerm || term}</h1>
    </div>
  );
};

export default Search;
